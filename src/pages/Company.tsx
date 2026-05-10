import { Helmet } from 'react-helmet-async';
import { CompanyProfile } from '../components/CompanyProfile';
import { Members } from '../components/Members';
import { Partners } from '../components/Partners';
import { CompanyMap } from '../components/CompanyMap';

export const Company = () => {
    return (
        <div className="pt-20">
            <Helmet>
                <title>会社情報 | 株式会社U's企画</title>
                <meta
                    name="description"
                    content="株式会社U's企画の会社概要・代表メッセージ・メンバー・提携先・所在地のご案内。IRコンサルティングを軸に、企業価値の向上に貢献します。"
                />
                <link rel="canonical" href="https://www.us-kikaku.com/company" />
            </Helmet>
            <CompanyProfile />
            <Members />
            <Partners />
            <CompanyMap />
        </div>
    );
};
