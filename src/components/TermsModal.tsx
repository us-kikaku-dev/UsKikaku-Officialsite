import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal = ({ isOpen, onClose }: TermsModalProps) => {
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
                <h3 className="text-lg font-medium leading-6 text-white serif-text">利用規約</h3>
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
                <p>本規約は、株式会社U’s企画（以下「当社」）が提供する自社サービス「OKKAKE」および当社ウェブサイト（以下「本サービス」）の利用条件を定めるものです。本サービスを利用することにより、ユーザーは本規約に同意したものとみなします。</p>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">1. 適用</h4>
                  <p>本規約は、本サービスを利用するすべてのユーザーに適用されます。</p>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">2. 利用登録</h4>
                  <p>本サービスの利用にあたり、必要に応じてユーザー登録を行う場合があります。登録時の情報は正確かつ最新の状態に保つものとします。</p>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">3. 禁止事項</h4>
                  <p className="mb-2">ユーザーは、本サービスの利用に際して以下の行為を禁止します。</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>法令または公序良俗に反する行為</li>
                    <li>他者になりすます行為</li>
                    <li>迷惑行為、誹謗中傷、プライバシー侵害</li>
                    <li>反社会的勢力への利益供与</li>
                    <li>本サービスのサーバー・ネットワークへの不正アクセス</li>
                    <li>事実と異なる情報の投稿</li>
                    <li>当社・他者の権利を侵害する行為</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">4. コンテンツの取り扱い</h4>
                  <p>ユーザーが投稿した内容の権利はユーザーに帰属します。ただし、当社はサービス運営に必要な範囲で、投稿内容を利用・表示できるものとします。</p>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">5. サービスの停止・変更</h4>
                  <p>当社は、運用上の必要性または不可抗力により、本サービスの内容を変更し、または提供を停止する場合があります。</p>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">6. 免責事項</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>当社は、本サービスに関して提供される情報の正確性・完全性を保証しません。</li>
                    <li>本サービスの利用により生じた損害について、当社は一切の責任を負いません。</li>
                    <li>外部サービス連携によるトラブルについても、当社は責任を負いません。</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">7. 契約解除</h4>
                  <p>ユーザーが本規約に違反した場合、当社は事前通知なく利用を停止できるものとします。</p>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">8. 知的財産</h4>
                  <p>本サービスに含まれるテキスト、画像、ロゴ、プログラム等の著作権その他の知的財産権は、当社または正当な権利者に帰属します。</p>
                </section>

                <section>
                  <h4 className="font-bold text-[#050A14] mb-2">9. 準拠法・裁判管轄</h4>
                  <p>本規約は日本法に基づき解釈されます。本サービスに関連して生じた紛争については、東京地方裁判所を第一審の専属管轄裁判所とします。</p>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
