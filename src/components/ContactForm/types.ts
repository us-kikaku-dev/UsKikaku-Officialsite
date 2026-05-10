// 型定義
export type InquiryType = 'Capital Voice Japanについて' | 'IRコンサルティング' | '受託開発・Web制作' | 'その他';

export interface ContactFormInputs {
    companyName: string;
    personName: string;
    email: string;
    phoneNumber?: string;
    inquiryType: InquiryType;

    // Capital Voice Japan
    cvjInquiryCategory?: string;
    cvjListingStatus?: string;
    cvjSecurityCode?: string;
    cvjArticleUrl?: string;

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
