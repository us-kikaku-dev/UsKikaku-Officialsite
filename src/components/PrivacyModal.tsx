import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050A14]/80 backdrop-blur-sm"
            onClick={onClose}
          ></motion.div>

          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl pointer-events-auto"
            >
              {/* Header */}
              <div className="bg-[#0B1C3D] px-4 py-3 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg font-medium leading-6 text-white serif-text">プライバシーポリシー</h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md text-gray-300 hover:text-white focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="px-4 py-5 sm:p-6 text-sm text-gray-600 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <p>株式会社U’s企画（以下「当社」）は、当社が提供するIRコンサルティング事業、並びに自社サービス「OKKAKE」（以下「本サービス」）の運営において取得する個人情報について、以下の方針に基づき適切に管理・保護いたします。</p>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">1. 取得する情報</h4>
                  <p className="mb-2">当社は以下の情報を取得する場合があります。</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>氏名、会社名、役職</li>
                    <li>メールアドレス、電話番号</li>
                    <li>アクセスログ、Cookie、IPアドレス等の技術情報</li>
                    <li>お問い合わせ内容、アンケート回答</li>
                    <li>本サービス利用時に入力されたユーザー情報（プロフィール、投稿データ等）</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">2. 利用目的</h4>
                  <p className="mb-2">取得した情報は、以下の目的で利用します。</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>当社サービス（IRコンサルティング、OKKAKE）の提供・運営</li>
                    <li>各種お問い合わせ対応</li>
                    <li>サービス品質向上・機能改善のための分析</li>
                    <li>メンテナンス・重要なお知らせ等のご案内</li>
                    <li>契約・商談に関する連絡</li>
                    <li>法令順守のための確認</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">3. 情報の第三者提供</h4>
                  <p className="mb-2">当社は、以下の場合を除き、第三者へ個人情報を提供しません。</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>本人の同意がある場合</li>
                    <li>法令に基づく場合</li>
                    <li>サービス運営に必要な業務委託先へ提供する場合（秘密保持契約を締結した上で実施）</li>
                    <li>統計的処理により個人を特定できない形式に加工した場合</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">4. 情報の管理</h4>
                  <p>当社は、個人情報への不正アクセス・漏洩・改ざんを防止するため、適切なセキュリティ対策を講じます。</p>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">5. 外部サービスについて</h4>
                  <p>本サービスでは、アクセス解析・決済・インフラ等の外部サービスを利用する場合があります。各サービスの提供するプライバシーポリシーをご確認ください。</p>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">6. 個人情報の開示・訂正・削除</h4>
                  <p>本人からの開示・訂正・削除の請求がある場合、法令に基づき適切に対応します。</p>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">7. 未成年者の利用</h4>
                  <p>未成年者がサービスを利用する場合は、保護者の同意の上でご利用ください。</p>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">8. プライバシーポリシーの改定</h4>
                  <p>本ポリシーの内容は、必要に応じて予告なく変更する場合があります。</p>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">9. お問い合わせ</h4>
                  <p>本ポリシーに関するお問い合わせは、以下までお願いいたします。</p>
                  <p className="mt-2">
                    株式会社U’s企画<br />
                    Email：admin@us-kikaku.com
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
