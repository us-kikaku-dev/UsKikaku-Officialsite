import { RefObject } from 'react';
import { motion } from 'motion/react';
import ReCAPTCHA from 'react-google-recaptcha';
import { UseFormGetValues } from 'react-hook-form';
import { ContactFormInputs, InquiryType } from './types';
import { FormRow } from './FormRow';

// 環境変数からのみ取得。fallbackを設けず、未設定なら送信不可とする
const recaptchaSiteKey: string | undefined = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
if (!recaptchaSiteKey) {
    // 運用事故を早期検知するため、env未設定はビルド時に気付ける形でログ出力
    console.error('[ContactForm] VITE_RECAPTCHA_SITE_KEY is not set. The submit button will be disabled.');
}

interface Step2ConfirmProps {
    getValues: UseFormGetValues<ContactFormInputs>;
    inquiryType: InquiryType;
    recaptchaRef: RefObject<ReCAPTCHA>;
    recaptchaToken: string | null;
    setRecaptchaToken: (token: string | null) => void;
    isSending: boolean;
    onBack: () => void;
    onFinalSubmit: () => void;
}

export const Step2Confirm = ({
    getValues,
    inquiryType,
    recaptchaRef,
    recaptchaToken,
    setRecaptchaToken,
    isSending,
    onBack,
    onFinalSubmit,
}: Step2ConfirmProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
        >
            <div className="space-y-12">
                <div className="text-center font-medium text-[#050A14] tracking-wider" style={{ marginBottom: '60px' }}>
                    以下の内容で送信します。よろしいですか？
                </div>

                <dl className="space-y-8">
                    <FormRow label="会社名" value={getValues('companyName') || '-'} />
                    <FormRow label="お名前" value={getValues('personName')} />
                    <FormRow label="メールアドレス" value={getValues('email')} />
                    <FormRow label="電話番号" value={getValues('phoneNumber') || '-'} />
                    <FormRow label="お問い合わせ種別" value={inquiryType} />

                    {/* Conditional Previews */}
                    {inquiryType === 'Capital Voice Japanについて' && (
                        <>
                            <FormRow label="お問い合わせ区分" value={getValues('cvjInquiryCategory') || '-'} />
                            <FormRow label="上場区分" value={getValues('cvjListingStatus') || '-'} />
                            <FormRow label="証券コード" value={getValues('cvjSecurityCode') || '-'} />
                            <FormRow label="対象記事URL" value={getValues('cvjArticleUrl') || '-'} />
                        </>
                    )}
                    {inquiryType === 'IRコンサルティング' && (
                        <>
                            <FormRow label="ご相談内容" value={Array.isArray(getValues('irConsultingContents')) ? getValues('irConsultingContents')!.join(', ') : '-'} />
                            <FormRow label="作成体制" value={getValues('irProductionSystem') || '-'} />
                            <FormRow label="証券コード" value={getValues('securityCode') || '-'} />
                            <FormRow label="参考URL" value={getValues('irReferenceUrl') || '-'} />
                        </>
                    )}
                    {inquiryType === '受託開発・Web制作' && (
                        <>
                            <FormRow label="開発の種類" value={getValues('devType') || '-'} />
                            <FormRow label="ご予算感" value={getValues('budget') || '-'} />
                            <FormRow label="希望納期" value={getValues('deadline') || '-'} />
                            <FormRow label="参考サイトURL" value={getValues('devReferenceUrl') || '-'} />
                        </>
                    )}

                    <FormRow label="お問い合わせ詳細" value={getValues('message')} isLast />
                </dl>

                {/* reCAPTCHA — 送信前に必須。env未設定時はキー漏洩を避けるためフォーム送信を無効化する */}
                <div className="flex justify-center w-full" style={{ marginTop: '60px' }}>
                    {recaptchaSiteKey ? (
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={recaptchaSiteKey}
                            onChange={(token) => setRecaptchaToken(token)}
                            onExpired={() => setRecaptchaToken(null)}
                            hl="ja"
                        />
                    ) : (
                        <p className="text-center text-sm" style={{ color: '#b91c1c', maxWidth: '32rem' }}>
                            現在フォーム設定に問題があり、送信を受け付けられません。お手数ですが、時間をおいて再度お試しください。
                        </p>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '40px', flexDirection: 'row-reverse' }}>
                    {/* Submit Button (Primary) - Gold */}
                    <div className="flex flex-col items-center">
                        <button
                            onClick={onFinalSubmit}
                            disabled={isSending || !recaptchaToken || !recaptchaSiteKey}
                            className="force-btn-style"
                            type="button"
                            style={(!recaptchaToken || isSending || !recaptchaSiteKey) ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
                        >
                            {isSending ? 'SENDING...' : '送信する'}
                        </button>
                    </div>

                    {/* Back Button (Secondary) - Grey Border */}
                    <button
                        onClick={onBack}
                        className="force-btn-secondary"
                        type="button"
                    >
                        修正する
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
