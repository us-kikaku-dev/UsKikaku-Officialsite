import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { ContactFormInputs, InquiryType } from './types';
import './styles.css';
import { StepIndicator } from './StepIndicator';
import { Step1Input } from './Step1Input';
import { Step2Confirm } from './Step2Confirm';
import { Step3Complete } from './Step3Complete';
import { useContactSubmit } from './useContactSubmit';

// URLクエリ ?type=xxx → お問い合わせ種別 の対応表。
// 導線元ページからの遷移時に種別を事前選択する（通常アクセス時は未選択のまま＝必須バリデーション維持）
const TYPE_PARAM_MAP: Record<string, InquiryType> = {
    'ir-voice': 'IR Voiceについて',
};

export const ContactForm = () => {
    const [searchParams] = useSearchParams();
    const presetInquiryType = TYPE_PARAM_MAP[searchParams.get('type') ?? ''];

    const {
        register,
        watch,
        trigger,
        getValues,
        resetField,
        formState: { errors }
    } = useForm<ContactFormInputs>({
        mode: 'onBlur',
        // 種別はクエリ指定があるときだけ事前選択する。それ以外のdefaultValuesは
        // 必須バリデーションを効かせるため設定しない
        defaultValues: presetInquiryType ? { inquiryType: presetInquiryType } : undefined,
    });

    const inquiryType = watch('inquiryType');
    // IR Voice: 立場が「企業のIRご担当者様」のときだけ詳細項目（上場区分など）を出すために監視する
    const irvPersona = watch('irvPersona');
    // Capital Voice Japan: 区分の選択肢が立場（読者/企業・事業者）で切り替わるため監視する
    const cvjPersona = watch('cvjPersona');

    // 立場を切り替えたら区分の選択をリセットする。
    // 切り替え前の選択肢の値が残ると、表示上どれも選ばれていないのに
    // バリデーションだけ通ってしまう不整合が起きるため
    useEffect(() => {
        resetField('cvjInquiryCategory');
    }, [cvjPersona, resetField]);

    const {
        step,
        isSending,
        sendError,
        recaptchaToken,
        setRecaptchaToken,
        recaptchaRef,
        handleConfirm,
        handleBack,
        handleFinalSubmit,
    } = useContactSubmit({ getValues, trigger });

    return (
        <div className="w-full max-w-2xl mx-auto" style={{ paddingTop: '0', paddingBottom: '160px' }}>
            {/* Step Indicator */}
            <StepIndicator step={step} />

            {/* Error Message */}
            {sendError && (
                <div className="mb-8 p-4 bg-red-50 text-red-600 text-sm tracking-wide">
                    {sendError}
                </div>
            )}

            {/* --- STEP 1: INPUT --- */}
            {step === 1 && (
                <Step1Input
                    register={register}
                    errors={errors}
                    inquiryType={inquiryType}
                    irvPersona={irvPersona}
                    cvjPersona={cvjPersona}
                    onConfirm={handleConfirm}
                />
            )}

            {/* --- STEP 2: CONFIRM --- */}
            {step === 2 && (
                <Step2Confirm
                    getValues={getValues}
                    inquiryType={inquiryType}
                    recaptchaRef={recaptchaRef}
                    recaptchaToken={recaptchaToken}
                    setRecaptchaToken={setRecaptchaToken}
                    isSending={isSending}
                    onBack={handleBack}
                    onFinalSubmit={handleFinalSubmit}
                />
            )}

            {/* --- STEP 3: COMPLETE --- */}
            {step === 3 && <Step3Complete />}

        </div>
    );
};
