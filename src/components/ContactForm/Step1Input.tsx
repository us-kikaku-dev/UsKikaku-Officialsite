import { motion, AnimatePresence } from 'motion/react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ContactFormInputs, InquiryType } from './types';

interface Step1InputProps {
    register: UseFormRegister<ContactFormInputs>;
    errors: FieldErrors<ContactFormInputs>;
    inquiryType: InquiryType;
    onConfirm: () => void;
}

// 共通スタイル
const labelStyle = "force-label-style";
// Modified inputStyle: Darker gray border (gray-500) and Gold focus border (#C5A065)
const inputStyle = "force-input-style";
const errorStyle = "force-error-message";
const radioStyle = "w-5 h-5 text-[#D4AF37] border-gray-300 focus:ring-[#D4AF37]";

export const Step1Input = ({ register, errors, inquiryType, onConfirm }: Step1InputProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                {/* A. 共通ヘッダー */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                    <div>
                        <label className={labelStyle}>会社名</label>
                        <input
                            type="text"
                            className={inputStyle}
                            placeholder="株式会社U's企画（個人の方は空欄で可）"
                            {...register('companyName')}
                        />
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
                            aria-invalid={!!errors.personName}
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
                            aria-invalid={!!errors.email}
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
                        {['Capital Voice Japanについて', 'IRコンサルティング', '受託開発・Web制作', 'その他'].map((type) => (
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
                    {errors.inquiryType && <span className={errorStyle}>{errors.inquiryType.message}</span>}
                </div>

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
                            <div>
                                <label className={labelStyle}>
                                    お問い合わせ区分
                                    <span className="force-required-mark">※必須</span>
                                </label>
                                <div className="flex flex-col gap-4">
                                    {[
                                        '取材依頼（自社の取材を希望）',
                                        '取材対象の推薦',
                                        '記事へのご意見・ご感想',
                                        'メディア提携・広告のご相談',
                                        'その他',
                                    ].map(item => (
                                        <label key={item} className="flex items-center cursor-pointer group">
                                            <input type="radio" value={item} aria-invalid={!!errors.cvjInquiryCategory} {...register('cvjInquiryCategory', { required: '※お問い合わせ区分を選択してください' })} className={radioStyle + " mr-3"} />
                                            <span className="text-[#050A14] group-hover:text-[#D4AF37] transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.cvjInquiryCategory && <span className={errorStyle}>{errors.cvjInquiryCategory.message}</span>}
                            </div>

                            <div>
                                <label className={labelStyle}>上場区分</label>
                                <div className="flex flex-col md:flex-row gap-6 flex-wrap">
                                    {['上場企業', '上場準備中', 'その他'].map(item => (
                                        <label key={item} className="flex items-center cursor-pointer group">
                                            <input type="radio" value={item} {...register('cvjListingStatus')} className={radioStyle + " mr-3"} />
                                            <span className="text-[#050A14] group-hover:text-[#D4AF37] transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className={labelStyle}>証券コード</label>
                                <input type="text" className={inputStyle} placeholder="1234" {...register('cvjSecurityCode')} />
                            </div>

                            <div>
                                <label className={labelStyle}>対象記事URL</label>
                                <input type="text" className={inputStyle} placeholder="https://capital-voice.com/article/..." {...register('cvjArticleUrl')} />
                            </div>
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
                            style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
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
                        aria-invalid={!!errors.message}
                        {...register('message', { required: '※お問い合わせ詳細を入力してください' })}
                    ></textarea>
                    {errors.message && <span className={errorStyle}>{errors.message.message}</span>}
                </div>


                {/* Submit Button */}
                <div className="text-center" style={{ marginTop: '16px' }}>
                    <button
                        onClick={onConfirm}
                        className="force-btn-style"
                        type="button"
                    >
                        確認画面へ進む
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
