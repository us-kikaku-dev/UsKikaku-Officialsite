import React, { useState, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import { CheckCircle, AlertCircle, ArrowRight, ArrowLeft, Send } from 'lucide-react';

// 型定義
type InquiryType = 'IRコンサルティング' | '受託開発・Web制作' | '自社プロダクト(OKKAKE)' | 'その他';

interface ContactFormInputs {
    companyName: string;
    personName: string;
    email: string;
    phoneNumber?: string;
    inquiryType: InquiryType;

    // IRコンサルティング
    irConsultingContents?: string[];
    irProductionSystem?: string;
    securityCode?: string;
    irReferenceUrl?: string;

    // 受託開発・Web制作
    devType?: string;
    budget?: string;
    deadline?: string;
    devReferenceUrl?: string;

    // 自社プロダクト(OKKAKE)
    okkakeCategory?: string;
    okkakeOs?: string;

    // 共通
    message: string;
}

export const ContactForm = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [isSending, setIsSending] = useState(false);
    const [sendError, setSendError] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        getValues,
        formState: { errors }
    } = useForm<ContactFormInputs>({
        mode: 'onBlur',
        // defaultValues removed to enforce validation
    });

    const inquiryType = watch('inquiryType');

    // Error Handler for auto-scroll
    const onError = (errors: any) => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
            // Priority order of fields to scroll to
            const fieldOrder = ['companyName', 'personName', 'email', 'phoneNumber', 'inquiryType', 'irConsultingContents', 'irProductionSystem', 'securityCode', 'irReferenceUrl', 'devType', 'budget', 'deadline', 'devReferenceUrl', 'okkakeCategory', 'okkakeOs', 'message'];

            // Find the first error field based on our defined order
            const firstErrorField = fieldOrder.find(field => errorKeys.includes(field)) || errorKeys[0];

            // Try to find the element by name attribute which react-hook-form uses
            const element = document.querySelector(`[name="${firstErrorField}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    // Step 1 -> Step 2
    const handleConfirm = async () => {
        // Trigger validation for all fields
        const isValid = await trigger();
        if (isValid) {
            setStep(2);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Manually call onError with current errors if validation fails
            onError(errors);
        }
    };

    // Step 2 -> Step 1
    const handleBack = () => {
        setStep(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Wrapper for Final Submit to bypass validation on unmounted fields
    const handleFinalSubmit = async () => {
        console.log("handleFinalSubmit: Started");
        if (isSending) {
            console.log("handleFinalSubmit: Aborted (Already sending)");
            return;
        }
        const data = getValues();
        console.log("handleFinalSubmit: Data retrieved", data);
        await onSubmit(data);
    };

    // Step 2 -> Step 3 (Submit)
    const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
        console.log("onSubmit: Started", data);
        setIsSending(true);
        setSendError(null);

        // reCAPTCHA verify (mock if no key)
        const recaptchaValue = recaptchaRef.current?.getValue();
        console.log("onSubmit: ReCAPTCHA Value", recaptchaValue);

        try {
            // Updated to use VITE_ prefix as per Vite standards
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            console.log("onSubmit: Env Vars Check", {
                hasServiceId: !!serviceId,
                serviceIdLen: serviceId ? serviceId.length : 0,
                hasTemplateId: !!templateId,
                hasPublicKey: !!publicKey
            });

            if (!serviceId || !templateId || !publicKey) {
                console.error("onSubmit: EmailJS Env vars missing.");
                throw new Error("Configuration Error: Missing EmailJS Environment Variables");
            }

            // Convert checkbox array to string for email template
            const templateParams = {
                ...data,
                irConsultingContents: Array.isArray(data.irConsultingContents) ? data.irConsultingContents.join(', ') : '',
                // Add ReCAPTCHA token to template params if verified on backend/emailjs
                'g-recaptcha-response': recaptchaValue
            };

            console.log("onSubmit: Sending to EmailJS with params", templateParams);

            await emailjs.send(serviceId, templateId, templateParams as unknown as Record<string, unknown>, publicKey);

            console.log("onSubmit: EmailJS Send Success");
            setStep(3);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error: any) {
            console.error('EmailJS Error Detail:', error);
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
            console.log("onSubmit: Finished");
            setIsSending(false);
        }
    };

    // 共通スタイル
    const labelStyle = "force-label-style";
    // Modified inputStyle: Darker gray border (gray-500) and Gold focus border (#C5A065)
    const inputStyle = "force-input-style";
    const errorStyle = "force-error-message";
    const radioStyle = "w-5 h-5 text-[#D4AF37] border-gray-300 focus:ring-[#D4AF37]";

    return (
        <div className="w-full max-w-2xl mx-auto" style={{ paddingTop: '0', paddingBottom: '160px' }}>
            {/* Step Indicator */}
            <div className="flex items-center justify-center space-x-4" style={{ marginBottom: '60px' }}>
                <div className={`text-sm tracking-widest ${step >= 1 ? 'text-[#050A14] font-bold' : 'text-gray-300'}`}>01 Input</div>
                <div className="w-8 h-[1px] bg-gray-300"></div>
                <div className={`text-sm tracking-widest ${step >= 2 ? 'text-[#050A14] font-bold' : 'text-gray-300'}`}>02 Confirm</div>
                <div className="w-8 h-[1px] bg-gray-300"></div>
                <div className={`text-sm tracking-widest ${step >= 3 ? 'text-[#050A14] font-bold' : 'text-gray-300'}`}>03 Complete</div>
            </div>

            {/* Global Styles for Contact Form - Restored */}
            <style>{`
                .force-btn-style {
                    display: inline-block !important;
                    border: 1px solid #C5A065 !important;
                    padding: 18px 80px !important;
                    background-color: transparent !important;
                    color: #C5A065 !important;
                    font-weight: bold !important;
                    font-size: 16px !important;
                    cursor: pointer !important;
                    transition: all 0.3s ease !important;
                    text-align: center !important;
                    line-height: normal !important;
                    min-width: 200px !important;
                }
                .force-btn-style:hover {
                    background-color: #C5A065 !important;
                    color: #fff !important;
                }
                .force-label-style {
                    font-size: 15px !important;
                    font-weight: 700 !important;
                    color: #333 !important;
                    margin-bottom: 8px !important;
                    display: block !important;
                    letter-spacing: 0.05em !important;
                }
                .force-input-style {
                    background-color: #F7F7F7 !important;
                    border: 1px solid #E5E5E5 !important;
                    padding: 12px 16px !important;
                    border-radius: 4px !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                    font-size: 16px !important;
                    color: #050A14 !important;
                    transition: border-color 0.3s ease !important;
                }
                .force-input-style:focus {
                    border-color: #C5A065 !important;
                    outline: none !important;
                }
                .force-textarea-style {
                    resize: vertical !important;
                    min-height: 160px !important;
                }
                .force-required-mark {
                    color: #E02424 !important;
                    font-size: 12px !important;
                    margin-left: 8px !important;
                    vertical-align: middle !important;
                    font-weight: normal !important;
                }
                .force-error-message {
                    color: #E02424 !important;
                    font-size: 13px !important;
                    margin-top: 8px !important;
                    font-weight: normal !important;
                    display: block !important;
                }
                .force-btn-secondary {
                    display: inline-block !important;
                    border: 1px solid #E5E5E5 !important;
                    padding: 18px 0 !important; /* Fixed width via width prop or min-width */
                    background-color: transparent !important;
                    color: #888 !important;
                    font-size: 14px !important;
                    cursor: pointer !important;
                    transition: all 0.3s ease !important;
                    text-align: center !important;
                    text-decoration: none !important;
                    min-width: 200px !important;
                }
                .force-btn-secondary:hover {
                    border-color: #050A14 !important;
                    color: #050A14 !important;
                }
            `}</style>

            {/* Error Message */}
            {sendError && (
                <div className="mb-8 p-4 bg-red-50 text-red-600 text-sm tracking-wide">
                    {sendError}
                </div>
            )}

            {/* --- STEP 1: INPUT --- */}
            {step === 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                        {/* A. 共通ヘッダー */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                            <div>
                                <label className={labelStyle}>
                                    会社名
                                    <span className="force-required-mark">※必須</span>
                                </label>
                                <input
                                    type="text"
                                    className={inputStyle}
                                    placeholder="株式会社U's企画"
                                    {...register('companyName', { required: '※会社名を入力してください' })}
                                />
                                {errors.companyName && <span className={errorStyle}>{errors.companyName.message}</span>}
                            </div>
                            <div>
                                <label className={labelStyle}>
                                    お名前
                                    <span className="force-required-mark">※必須</span>
                                </label>
                                <input
                                    type="text"
                                    className={inputStyle}
                                    placeholder="山田 太郎"
                                    {...register('personName', { required: '※お名前を入力してください' })}
                                />
                                {errors.personName && <span className={errorStyle}>{errors.personName.message}</span>}
                            </div>
                            <div>
                                <label className={labelStyle}>
                                    メールアドレス
                                    <span className="force-required-mark">※必須</span>
                                </label>
                                <input
                                    type="email"
                                    className={inputStyle}
                                    placeholder="example@us-kikaku.com"
                                    {...register('email', {
                                        required: '※メールアドレスを入力してください',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: '※正しいメールアドレス形式で入力してください'
                                        }
                                    })}
                                />
                                {errors.email && <span className={errorStyle}>{errors.email.message}</span>}
                            </div>
                            <div>
                                <label className={labelStyle}>電話番号</label>
                                <input
                                    type="tel"
                                    className={inputStyle}
                                    placeholder="03-1234-5678"
                                    {...register('phoneNumber')}
                                />
                            </div>
                        </div>

                        {/* B. お問い合わせ種別 - Horizontal Radio */}
                        <div>
                            <label className={`${labelStyle} mb-4 block`}>
                                お問い合わせ種別
                                <span className="force-required-mark">※必須</span>
                            </label>
                            <div className="flex flex-col md:flex-row gap-6 flex-wrap">
                                {['IRコンサルティング', '受託開発・Web制作', '自社プロダクト(OKKAKE)', 'その他'].map((type) => (
                                    <label key={type} className="flex items-center cursor-pointer group">
                                        <input
                                            type="radio"
                                            value={type}
                                            className={`${radioStyle} mr-3`}
                                            {...register('inquiryType', { required: '※お問い合わせ種別を選択してください' })}
                                        />
                                        <span className={`text-[#050A14] group-hover:text-[#D4AF37] transition-colors ${inquiryType === type ? 'font-bold' : 'font-normal'}`}>
                                            {type}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.inquiryType && <span className={errorStyle}>{errors.inquiryType.message}</span>}
                        </div>

                        {/* C. 詳細項目 (Dynamic) - Flat Style */}
                        <AnimatePresence mode='wait'>
                            {inquiryType === 'IRコンサルティング' && (
                                <motion.div
                                    key="ir"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="pt-6 border-t border-gray-100 overflow-hidden"
                                    style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}
                                >
                                    <div>
                                        <label className={labelStyle}>ご相談内容（複数可）</label>
                                        <div className="flex flex-col md:flex-row gap-6 flex-wrap">
                                            {['決算説明資料', '統合報告書', 'IRサイト制作', 'その他'].map(item => (
                                                <label key={item} className="flex items-center cursor-pointer group">
                                                    <input type="checkbox" value={item} {...register('irConsultingContents')} className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37] mr-3" />
                                                    <span className="text-[#050A14] group-hover:text-[#D4AF37] transition-colors">{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelStyle}>現在の作成体制</label>
                                        <div className="flex flex-col md:flex-row gap-6 flex-wrap">
                                            {['自社で作成', '一部外注', '全て外注'].map(item => (
                                                <label key={item} className="flex items-center cursor-pointer group">
                                                    <input type="radio" value={item} {...register('irProductionSystem')} className={radioStyle + " mr-3"} />
                                                    <span className="text-[#050A14] group-hover:text-[#D4AF37] transition-colors">{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelStyle}>証券コード</label>
                                        <input type="text" className={inputStyle} placeholder="1234" {...register('securityCode')} />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>参考URL</label>
                                        <input type="text" className={inputStyle} placeholder="https://..." {...register('irReferenceUrl')} />
                                    </div>
                                </motion.div>
                            )}

                            {inquiryType === '受託開発・Web制作' && (
                                <motion.div
                                    key="dev"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="pt-6 border-t border-gray-100 overflow-hidden"
                                    style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}
                                >
                                    <div>
                                        <label className={labelStyle}>開発の種類</label>
                                        <select className="force-input-style" {...register('devType')}>
                                            <option value="">選択してください</option>
                                            <option value="コーポレートサイト制作">コーポレートサイト制作</option>
                                            <option value="採用サイト制作">採用サイト制作</option>
                                            <option value="システム開発">システム開発</option>
                                            <option value="アプリ開発">アプリ開発</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelStyle}>ご予算感</label>
                                        <select className="force-input-style" {...register('budget')}>
                                            <option value="">選択してください</option>
                                            <option value="〜300万円">〜300万円</option>
                                            <option value="〜500万円">〜500万円</option>
                                            <option value="〜1,000万円">〜1,000万円</option>
                                            <option value="1,000万円以上">1,000万円以上</option>
                                            <option value="未定">未定</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className={labelStyle}>希望納期</label>
                                        <select className="force-input-style" {...register('deadline')}>
                                            <option value="">選択してください</option>
                                            <option value="特になし">特になし</option>
                                            <option value="3ヶ月以内">3ヶ月以内</option>
                                            <option value="半年以内">半年以内</option>
                                            <option value="急ぎ(1-2ヶ月)">急ぎ(1-2ヶ月)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelStyle}>参考サイト・既存サイトURL</label>
                                        <input type="text" className={inputStyle} placeholder="https://..." {...register('devReferenceUrl')} />
                                    </div>
                                </motion.div>
                            )}

                            {inquiryType === '自社プロダクト(OKKAKE)' && (
                                <motion.div
                                    key="okkake"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="pt-6 border-t border-gray-100 overflow-hidden"
                                    style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}
                                >
                                    <div>
                                        <label className={labelStyle}>区分</label>
                                        <div className="flex flex-col md:flex-row gap-6 flex-wrap">
                                            {['アプリ利用者(不具合・要望)', '法人・事務所様', 'メディア・取材'].map(item => (
                                                <label key={item} className="flex items-center cursor-pointer group">
                                                    <input type="radio" value={item} {...register('okkakeCategory')} className={radioStyle + " mr-3"} />
                                                    <span className="text-[#050A14] group-hover:text-[#D4AF37] transition-colors">{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelStyle}>ご利用のOS</label>
                                        <div className="flex flex-col md:flex-row gap-6 flex-wrap">
                                            {['iOS', 'Android', 'その他'].map(item => (
                                                <label key={item} className="flex items-center cursor-pointer group">
                                                    <input type="radio" value={item} {...register('okkakeOs')} className={radioStyle + " mr-3"} />
                                                    <span className="text-[#050A14] group-hover:text-[#D4AF37] transition-colors">{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* D. 共通フッター */}
                        <div>
                            <label className={labelStyle}>
                                お問い合わせ詳細
                                <span className="force-required-mark">※必須</span>
                            </label>
                            <textarea
                                className="w-full force-input-style force-textarea-style"
                                rows={6}
                                placeholder="具体的なご相談内容や、現在お困りの点をご記入ください"
                                {...register('message', { required: '※お問い合わせ詳細を入力してください' })}
                            ></textarea>
                            {errors.message && <span className={errorStyle}>{errors.message.message}</span>}
                        </div>


                        {/* Grouped Submit Area (reCAPTCHA + Button) for closeness */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                            {/* reCAPTCHA */}
                            <div className="flex justify-center w-full">
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6Ld2v1csAAAAADu4NPiUX4I5ECXxApZWkj0mII2G"} // 正規キー
                                    onChange={() => { }}
                                    hl="ja"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    onClick={handleConfirm}
                                    className="force-btn-style"
                                    type="button"
                                >
                                    確認画面へ進む
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* --- STEP 2: CONFIRM --- */}
            {step === 2 && (
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
                            <FormRow label="会社名" value={getValues('companyName')} />
                            <FormRow label="お名前" value={getValues('personName')} />
                            <FormRow label="メールアドレス" value={getValues('email')} />
                            <FormRow label="電話番号" value={getValues('phoneNumber') || '-'} />
                            <FormRow label="お問い合わせ種別" value={inquiryType} />

                            {/* Conditional Previews */}
                            {inquiryType === 'IRコンサルティング' && (
                                <>
                                    <FormRow label="ご相談内容" value={Array.isArray(getValues('irConsultingContents')) ? getValues('irConsultingContents')?.join(', ') : '-'} />
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
                            {inquiryType === '自社プロダクト(OKKAKE)' && (
                                <>
                                    <FormRow label="区分" value={getValues('okkakeCategory') || '-'} />
                                    <FormRow label="ご利用のOS" value={getValues('okkakeOs') || '-'} />
                                </>
                            )}

                            <FormRow label="お問い合わせ詳細" value={getValues('message')} isLast />
                        </dl>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '80px', flexDirection: 'row-reverse' }}>
                            {/* Submit Button (Primary) - Gold */}
                            <div className="flex flex-col items-center">
                                <button
                                    onClick={handleFinalSubmit}
                                    disabled={isSending}
                                    className="force-btn-style"
                                    type="button"
                                >
                                    {isSending ? 'SENDING...' : '送信する'}
                                </button>
                            </div>

                            {/* Back Button (Secondary) - Grey Border */}
                            <button
                                onClick={handleBack}
                                className="force-btn-secondary"
                                type="button"
                            >
                                修正する
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* --- STEP 3: COMPLETE --- */}
            {step === 3 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center py-20"
                >
                    <h3 className="serif-text text-2xl md:text-3xl text-[#050A14] mb-8">送信完了いたしました</h3>
                    <p className="text-gray-500 leading-relaxed mb-16 tracking-wide">
                        お問い合わせありがとうございます。<br />
                        担当者より2〜3営業日以内にご連絡させていただきます。
                    </p>
                    <a href="/" className="inline-block px-12 py-4 border border-[#050A14] text-[#050A14] font-medium tracking-widest hover:bg-[#050A14] hover:text-white transition-all duration-300">
                        トップページへ戻る
                    </a>
                </motion.div>
            )}

        </div>
    );
};

// Helper Component for Confirmation Row - Minimal Style with 40px spacing
const FormRow = ({ label, value, isLast = false }: { label: string, value: string, isLast?: boolean }) => (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid #E5E5E5', paddingBottom: isLast ? '0' : '24px', marginBottom: isLast ? '0' : '40px' }}>
        <dt className="text-[#333]" style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>{label}</dt>
        <dd className="text-[#050A14] whitespace-pre-wrap leading-relaxed" style={{ fontSize: '16px' }}>{value}</dd>
    </div>
);
