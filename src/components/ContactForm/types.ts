// 型定義
export type InquiryType = 'Capital Voice Japanについて' | 'IR Voiceについて' | 'IRコンサルティング' | '受託開発・Web制作' | 'その他';

// IR Voice の「ご利用の立場」のうち、企業向け詳細項目（上場区分・証券コード・導入検討時期）を
// 表示する対象。文字列の重複定義によるタイポ事故を防ぐため定数化
export const IRV_PERSONA_BUSINESS = '企業のIRご担当者様';

// Capital Voice Japan の「ご利用の立場」。区分の選択肢が立場で切り替わるため定数化
export const CVJ_PERSONA_READER = '読者・個人投資家の方';
export const CVJ_PERSONA_BUSINESS = '企業・事業者の方（IR・広報・メディア）';

// 立場ごとの区分の選択肢
export const CVJ_READER_CATEGORIES = [
    '記事へのご意見・ご感想',
    '取材してほしい企業の推薦',
    '記事内容の誤りのご指摘',
    'その他',
] as const;

export const CVJ_BUSINESS_CATEGORIES = [
    '取材のご依頼（自社の掲載希望）',
    '掲載記事についての確認・訂正のご依頼',
    'メディア提携・広告のご相談',
    '引用・転載のご相談',
    'その他',
] as const;

export interface ContactFormInputs {
    companyName: string;
    personName: string;
    email: string;
    phoneNumber?: string;
    inquiryType: InquiryType;

    // Capital Voice Japan
    cvjPersona?: string;
    cvjInquiryCategory?: string;
    cvjListingStatus?: string;
    cvjSecurityCode?: string;
    cvjArticleUrl?: string;

    // IR Voice
    irvPersona?: string;
    irvInquiryCategory?: string;
    irvListingStatus?: string;
    irvSecurityCode?: string;
    irvConsiderationTiming?: string;

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

    // 共通
    message: string;
}
