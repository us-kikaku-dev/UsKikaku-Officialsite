import type { CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import {
    ContactFormInputs,
    InquiryType,
    IRV_PERSONA_BUSINESS,
    CVJ_PERSONA_READER,
    CVJ_PERSONA_BUSINESS,
    CVJ_READER_CATEGORIES,
    CVJ_BUSINESS_CATEGORIES,
} from './types';

interface Step1InputProps {
    register: UseFormRegister<ContactFormInputs>;
    errors: FieldErrors<ContactFormInputs>;
    inquiryType: InquiryType;
    /** IR Voice: ご利用の立場（企業のときだけ詳細項目を表示する） */
    irvPersona?: string;
    /** Capital Voice Japan: ご利用の立場（区分の選択肢が立場で切り替わる） */
    cvjPersona?: string;
    onConfirm: () => void;
}

// 共通スタイル
const labelStyle = "force-label-style";
// Modified inputStyle: Darker gray border (gray-500) and Gold focus border (#C5A065)
const inputStyle = "force-input-style";
const errorStyle = "force-error-message";
const radioStyle = "w-5 h-5 text-[#D4AF37] border-gray-300 focus:ring-[#D4AF37]";

// fieldset/legend はブラウザ既定の枠線・余白をリセットし、divと同じ見た目を維持する
const fieldsetReset: CSSProperties = { border: 0, padding: 0, margin: 0, minWidth: 0 };
const legendReset: CSSProperties = { padding: 0 };

export const Step1Input = ({ register, errors, inquiryType, irvPersona, cvjPersona, onConfirm }: Step1InputProps) => {
    // CVJ: 立場に応じた区分の選択肢
    const cvjCategories = cvjPersona === CVJ_PERSONA_BUSINESS ? CVJ_BUSINESS_CATEGORIES : CVJ_READER_CATEGORIES;
    return (
        <motion.form
            noValidate
            onSubmit={(e) => {
                e.preventDefault();
                onConfirm();
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                {/* A. 共通ヘッダー */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                    <div>
                        <label className={labelStyle} htmlFor="contact-companyName">会社名</label>
                        <input
                            id="contact-companyName"
                            type="text"
                            className={inputStyle}
                            placeholder="株式会社U's企画（個人の方は空欄で可）"
                            autoComplete="organization"
                            {...register('companyName')}
                        />
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="contact-personName">
                            お名前
                            <span className="force-required-mark">※必須</span>
                        </label>
                        <input
                            id="contact-personName"
                            type="text"
                            className={inputStyle}
                            placeholder="山田 太郎"
                            autoComplete="name"
                            aria-invalid={!!errors.personName}
                            aria-describedby={errors.personName ? 'contact-personName-error' : undefined}
                            {...register('personName', { required: '※お名前を入力してください' })}
                        />
                        {errors.personName && <span id="contact-personName-error" role="alert" className={errorStyle}>{errors.personName.message}</span>}
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="contact-email">
                            メールアドレス
                            <span className="force-required-mark">※必須</span>
                        </label>
                        <input
                            id="contact-email"
                            type="email"
                            className={inputStyle}
                            placeholder="example@us-kikaku.com"
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'contact-email-error' : undefined}
                            {...register('email', {
                                required: '※メールアドレスを入力してください',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: '※正しいメールアドレス形式で入力してください'
                                }
                            })}
                        />
                        {errors.email && <span id="contact-email-error" role="alert" className={errorStyle}>{errors.email.message}</span>}
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="contact-phoneNumber">電話番号</label>
                        <input
                            id="contact-phoneNumber"
                            type="tel"
                            className={inputStyle}
                            placeholder="03-1234-5678"
                            autoComplete="tel"
                            {...register('phoneNumber')}
                        />
                    </div>
                </div>

                {/* B. お問い合わせ種別 - Horizontal Radio */}
                <fieldset style={fieldsetReset} aria-describedby={errors.inquiryType ? 'contact-inquiryType-error' : undefined}>
                    <legend className={`${labelStyle} mb-4 block`} style={legendReset}>
                        お問い合わせ種別
                        <span className="force-required-mark">※必須</span>
                    </legend>
                    <div className="flex flex-col md:flex-row gap-6 flex-wrap">
                        {['Capital Voice Japanについて', 'IR Voiceについて', 'IRコンサルティング', '受託開発・Web制作', 'その他'].map((type) => (
                            <label key={type} className="flex items-center cursor-pointer group">
                                <input
                                    type="radio"
                                    value={type}
                                    className={`${radioStyle} mr-3`}
                                    aria-invalid={!!errors.inquiryType}
                                    {...register('inquiryType', { required: '※お問い合わせ種別を選択してください' })}
                                />
                                <span className={`text-[#050A14] group-hover:text-[#D4AF37] transition-colors ${inquiryType === type ? 'font-bold' : 'font-normal'}`}>
                                    {type}
                                </span>
                            </label>
                        ))}
                    </div>
                    {errors.inquiryType && <span id="contact-inquiryType-error" role="alert" className={errorStyle}>{errors.inquiryType.message}</span>}
                </fieldset>

                {/* C. 詳細項目 (Dynamic) - Flat Style */}
                <AnimatePresence mode='wait'>
                    {inquiryType === 'Capital Voice Japanについて' && (
                        <motion.div
                            key="cvj"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-6 border-t border-gray-100 overflow-hidden"
                            style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
                        >
                            <fieldset style={fieldsetReset} aria-describedby={errors.cvjPersona ? 'contact-cvjPersona-error' : undefined}>
                                <legend className={labelStyle} style={legendReset}>
                                    ご利用の立場
                                    <span className="force-required-mark">※必須</span>
                                </legend>
                                <div className="flex flex-col md:flex-row gap-6 flex-wrap">
                                    {[CVJ_PERSONA_READER, CVJ_PERSONA_BUSINESS].map(item => (
                                        <label key={item} className="flex items-center cursor-pointer group">
                                            <input type="radio" value={item} aria-invalid={!!errors.cvjPersona} {...register('cvjPersona', { required: '※ご利用の立場を選択してください' })} className={radioStyle + " mr-3"} />
                                            <span className="text-[#050A14] group-hover:text-[#D4AF37] transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.cvjPersona && <span id="contact-cvjPersona-error" role="alert" className={errorStyle}>{errors.cvjPersona.message}</span>}
                            </fieldset>

                            {/* 区分は立場を選ぶと表示され、選択肢が立場で切り替わる */}
                            {cvjPersona && (
                                <motion.div
                                    key={cvjPersona}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                    style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
                                >
                                    <fieldset style={fieldsetReset} aria-describedby={errors.cvjInquiryCategory ? 'contact-cvjInquiryCategory-error' : undefined}>
                                        <legend className={labelStyle} style={legendReset}>
                                            お問い合わせ区分
                                            <span className="force-required-mark">※必須</span>
                                        </legend>
                                        <div className="flex flex-col gap-4">
                                            {cvjCategories.map(item => (
                                                <label key={item} className="flex items-center cursor-pointer group">
                                                    <input type="radio" value={item} aria-invalid={!!errors.cvjInquiryCategory} {...register('cvjInquiryCategory', { required: '※お問い合わせ区分を選択してください' })} className={radioStyle + " mr-3"} />
                                                    <span className="text-[#050A14] group-hover:text-[#D4AF37] transition-colors">{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.cvjInquiryCategory && <span id="contact-cvjInquiryCategory-error" role="alert" className={errorStyle}>{errors.cvjInquiryCategory.message}</span>}
                                    </fieldset>

                                    {/* 企業・事業者のときだけ、上場区分と証券コードを出す */}
                                    {cvjPersona === CVJ_PERSONA_BUSINESS && (
                                        <>
                                            <fieldset style={fieldsetReset}>
                                                <legend className={labelStyle} style={legendReset}>上場区分</legend>
                                                <div className="flex flex-col md:flex-row gap-6 flex-wrap">
                                                    {['上場企業', '上場準備中', 'その他'].map(item => (
                                                        <label key={item} className="flex items-center cursor-pointer group">
                                                            <input type="radio" value={item} {...register('cvjListingStatus')} className={radioStyle + " mr-3"} />
                                                            <span className="text-[#050A14] group-hover:text-[#D4AF37] transition-colors">{item}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </fieldset>

                                            <div>
                                                <label className={labelStyle} htmlFor="contact-cvjSecurityCode">証券コード</label>
                                                <input id="contact-cvjSecurityCode" type="text" className={inputStyle} placeholder="1234" {...register('cvjSecurityCode')} />
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <label className={labelStyle} htmlFor="contact-cvjArticleUrl">対象記事URL</label>
                                        <input id="contact-cvjArticleUrl" type="text" className={inputStyle} placeholder="https://capital-voice.com/article/..." {...register('cvjArticleUrl')} />
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {inquiryType === 'IR Voiceについて' && (
                        <motion.div
                            key="irv"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-6 border-t border-gray-100 overflow-hidden"
                            style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
                        >
                            <fieldset style={fieldsetReset} aria-describedby={errors.irvPersona ? 'contact-irvPersona-error' : undefined}>
                                <legend className={labelStyle} style={legendReset}>
                                    ご利用の立場
                                    <span className="force-required-mark">※必須</span>
                                </legend>
                                <div className="flex flex-col md:flex-row gap-6 flex-wrap">
                                    {[
                                        IRV_PERSONA_BUSINESS,
                                        '個人投資家の方',
                                        'その他（メディア・パートナー等）',
                                    ].map(item => (
                                        <label key={item} className="flex items-center cursor-pointer group">
                                            <input type="radio" value={item} aria-invalid={!!errors.irvPersona} {...register('irvPersona', { required: '※ご利用の立場を選択してください' })} className={radioStyle + " mr-3"} />
                                            <span className="text-[#050A14] group-hover:text-[#D4AF37] transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.irvPersona && <span id="contact-irvPersona-error" role="alert" className={errorStyle}>{errors.irvPersona.message}</span>}
                            </fieldset>

                            <fieldset style={fieldsetReset} aria-describedby={errors.irvInquiryCategory ? 'contact-irvInquiryCategory-error' : undefined}>
                                <legend className={labelStyle} style={legendReset}>
                                    お問い合わせ区分
                                    <span className="force-required-mark">※必須</span>
                                </legend>
                                <div className="flex flex-col gap-4">
                                    {[
                                        '導入・デモのご相談',
                                        'リリース情報・アプリについて',
                                        '取材・提携のご相談',
                                        'その他',
                                    ].map(item => (
                                        <label key={item} className="flex items-center cursor-pointer group">
                                            <input type="radio" value={item} aria-invalid={!!errors.irvInquiryCategory} {...register('irvInquiryCategory', { required: '※お問い合わせ区分を選択してください' })} className={radioStyle + " mr-3"} />
                                            <span className="text-[#050A14] group-hover:text-[#D4AF37] transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.irvInquiryCategory && <span id="contact-irvInquiryCategory-error" role="alert" className={errorStyle}>{errors.irvInquiryCategory.message}</span>}
                            </fieldset>

                            {/* 企業のIRご担当者様のときだけ、リード把握用の詳細項目を出す */}
                            {irvPersona === IRV_PERSONA_BUSINESS && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                    style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
                                >
                                    <fieldset style={fieldsetReset}>
                                        <legend className={labelStyle} style={legendReset}>上場区分</legend>
                                        <div className="flex flex-col md:flex-row gap-6 flex-wrap">
                                            {['上場企業', '上場準備中', 'その他'].map(item => (
                                                <label key={item} className="flex items-center cursor-pointer group">
                                                    <input type="radio" value={item} {...register('irvListingStatus')} className={radioStyle + " mr-3"} />
                                                    <span className="text-[#050A14] group-hover:text-[#D4AF37] transition-colors">{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </fieldset>

                                    <div>
                                        <label className={labelStyle} htmlFor="contact-irvSecurityCode">証券コード</label>
                                        <input id="contact-irvSecurityCode" type="text" className={inputStyle} placeholder="1234" {...register('irvSecurityCode')} />
                                    </div>

                                    <div>
                                        <label className={labelStyle} htmlFor="contact-irvConsiderationTiming">導入検討時期</label>
                                        <select id="contact-irvConsiderationTiming" className="force-input-style" {...register('irvConsiderationTiming')}>
                                            <option value="">選択してください</option>
                                            <option value="情報収集段階">情報収集段階</option>
                                            <option value="具体的に検討中">具体的に検討中</option>
                                            <option value="リリース後に検討">リリース後に検討</option>
                                            <option value="未定">未定</option>
                                        </select>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {inquiryType === 'IRコンサルティング' && (
                        <motion.div
                            key="ir"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-6 border-t border-gray-100 overflow-hidden"
                            style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
                        >
                            <fieldset style={fieldsetReset}>
                                <legend className={labelStyle} style={legendReset}>ご相談内容（複数可）</legend>
                                <div className="flex flex-col md:flex-row gap-6 flex-wrap">
                                    {['決算説明資料', '統合報告書', 'IRサイト制作', 'その他'].map(item => (
                                        <label key={item} className="flex items-center cursor-pointer group">
                                            <input type="checkbox" value={item} {...register('irConsultingContents')} className="w-5 h-5 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37] mr-3" />
                                            <span className="text-[#050A14] group-hover:text-[#D4AF37] transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            <fieldset style={fieldsetReset}>
                                <legend className={labelStyle} style={legendReset}>現在の作成体制</legend>
                                <div className="flex flex-col md:flex-row gap-6 flex-wrap">
                                    {['自社で作成', '一部外注', '全て外注'].map(item => (
                                        <label key={item} className="flex items-center cursor-pointer group">
                                            <input type="radio" value={item} {...register('irProductionSystem')} className={radioStyle + " mr-3"} />
                                            <span className="text-[#050A14] group-hover:text-[#D4AF37] transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            <div>
                                <label className={labelStyle} htmlFor="contact-securityCode">証券コード</label>
                                <input id="contact-securityCode" type="text" className={inputStyle} placeholder="1234" {...register('securityCode')} />
                            </div>
                            <div>
                                <label className={labelStyle} htmlFor="contact-irReferenceUrl">参考URL</label>
                                <input id="contact-irReferenceUrl" type="text" className={inputStyle} placeholder="https://..." {...register('irReferenceUrl')} />
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
                            style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
                        >
                            <div>
                                <label className={labelStyle} htmlFor="contact-devType">開発の種類</label>
                                <select id="contact-devType" className="force-input-style" {...register('devType')}>
                                    <option value="">選択してください</option>
                                    <option value="コーポレートサイト制作">コーポレートサイト制作</option>
                                    <option value="採用サイト制作">採用サイト制作</option>
                                    <option value="システム開発">システム開発</option>
                                    <option value="アプリ開発">アプリ開発</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelStyle} htmlFor="contact-budget">ご予算感</label>
                                <select id="contact-budget" className="force-input-style" {...register('budget')}>
                                    <option value="">選択してください</option>
                                    <option value="〜300万円">〜300万円</option>
                                    <option value="〜500万円">〜500万円</option>
                                    <option value="〜1,000万円">〜1,000万円</option>
                                    <option value="1,000万円以上">1,000万円以上</option>
                                    <option value="未定">未定</option>
                                </select>
                            </div>

                            <div>
                                <label className={labelStyle} htmlFor="contact-deadline">希望納期</label>
                                <select id="contact-deadline" className="force-input-style" {...register('deadline')}>
                                    <option value="">選択してください</option>
                                    <option value="特になし">特になし</option>
                                    <option value="3ヶ月以内">3ヶ月以内</option>
                                    <option value="半年以内">半年以内</option>
                                    <option value="急ぎ(1-2ヶ月)">急ぎ(1-2ヶ月)</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelStyle} htmlFor="contact-devReferenceUrl">参考サイト・既存サイトURL</label>
                                <input id="contact-devReferenceUrl" type="text" className={inputStyle} placeholder="https://..." {...register('devReferenceUrl')} />
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>

                {/* D. 共通フッター */}
                <div>
                    <label className={labelStyle} htmlFor="contact-message">
                        お問い合わせ詳細
                        <span className="force-required-mark">※必須</span>
                    </label>
                    <textarea
                        id="contact-message"
                        className="w-full force-input-style force-textarea-style"
                        rows={6}
                        placeholder="具体的なご相談内容や、現在お困りの点をご記入ください"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        {...register('message', { required: '※お問い合わせ詳細を入力してください' })}
                    ></textarea>
                    {errors.message && <span id="contact-message-error" role="alert" className={errorStyle}>{errors.message.message}</span>}
                </div>


                {/* Submit Button */}
                <div className="text-center" style={{ marginTop: '16px' }}>
                    <button
                        className="force-btn-style"
                        type="submit"
                    >
                        確認画面へ進む
                    </button>
                </div>
            </div>
        </motion.form>
    );
};
