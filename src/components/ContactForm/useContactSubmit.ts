import { useState, useRef } from 'react';
import { SubmitHandler, UseFormGetValues, UseFormTrigger } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import { ContactFormInputs } from './types';

interface UseContactSubmitParams {
    getValues: UseFormGetValues<ContactFormInputs>;
    trigger: UseFormTrigger<ContactFormInputs>;
}

// 送信ロジック（onSubmit / handleConfirm / handleFinalSubmit / handleBack）
export const useContactSubmit = ({ getValues, trigger }: UseContactSubmitParams) => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [isSending, setIsSending] = useState(false);
    const [sendError, setSendError] = useState<string | null>(null);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    // フィールド優先順（react-hook-form の register 順と概ね一致するが、
    // 表示順を担保するために明示的に保持）
    const fieldOrder: Array<keyof ContactFormInputs | string> = [
        'companyName', 'personName', 'email', 'phoneNumber',
        'inquiryType', 'cvjInquiryCategory', 'cvjListingStatus',
        'cvjSecurityCode', 'cvjArticleUrl', 'irConsultingContents',
        'irProductionSystem', 'securityCode', 'irReferenceUrl',
        'devType', 'budget', 'deadline', 'devReferenceUrl', 'message'
    ];

    // バリデーション失敗時の独自スクロール処理
    // shouldFocus: true でフォーカスは当たるが、scroll-margin が効かない場合の保険として
    // 最初のエラーフィールド（DOM 上の aria-invalid="true" 要素）を中央にスクロール
    const scrollToFirstError = () => {
        // 表示順優先で最初に aria-invalid="true" になっている要素を探す
        for (const name of fieldOrder) {
            const el = document.querySelector(`[name="${name}"][aria-invalid="true"]`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
        }
        // 念のためフォールバック：優先順リストに無いフィールドが無効な場合
        const fallback = document.querySelector('[aria-invalid="true"]');
        if (fallback) {
            fallback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // Step 1 -> Step 2
    const handleConfirm = async () => {
        // shouldFocus: true で最初のエラーフィールドへ自動フォーカス（react-hook-form 任せ）
        const isValid = await trigger(undefined, { shouldFocus: true });
        if (isValid) {
            setStep(2);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // DOM 反映後にスクロール（クロージャの古い errors を参照しない）
            requestAnimationFrame(scrollToFirstError);
        }
    };

    // Step 2 -> Step 1
    const handleBack = () => {
        setStep(1);
        setRecaptchaToken(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Step 2 -> Step 3 (Submit)
    const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
        setIsSending(true);
        setSendError(null);

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                throw new Error("Configuration Error: Missing EmailJS Environment Variables");
            }

            const templateParams = {
                ...data,
                irConsultingContents: Array.isArray(data.irConsultingContents) ? data.irConsultingContents.join(', ') : '',
                'g-recaptcha-response': recaptchaToken
            };

            await emailjs.send(serviceId, templateId, templateParams as unknown as Record<string, unknown>, publicKey);

            setStep(3);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error: any) {
            console.error('EmailJS Error:', error);
            if (error?.text) {
                // EmailJS specific error object often has a 'text' property
                setSendError(`送信エラー: ${error.text}`);
            } else if (error instanceof Error) {
                setSendError(`送信エラー: ${error.message}`);
            } else if (typeof error === 'object') {
                setSendError(`送信エラー: ${JSON.stringify(error)}`);
            } else {
                setSendError('送信に失敗しました。時間をおいて再度お試しいただくか、直接メールでお問い合わせください。');
            }
        } finally {
            setIsSending(false);
            // 失敗時はトークンを無効化（reCAPTCHA は1回限りのため）
            setRecaptchaToken(null);
            recaptchaRef.current?.reset();
        }
    };

    // Wrapper for Final Submit to bypass validation on unmounted fields
    const handleFinalSubmit = async () => {
        if (isSending) return;
        if (!recaptchaToken) {
            setSendError('※reCAPTCHA認証を完了してください');
            return;
        }
        const data = getValues();
        await onSubmit(data);
    };

    return {
        step,
        isSending,
        sendError,
        recaptchaToken,
        setRecaptchaToken,
        recaptchaRef,
        handleConfirm,
        handleBack,
        handleFinalSubmit,
    };
};
