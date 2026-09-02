import { Seo } from '../components/common/Seo';
import { CompanyProfile } from '../features/company/CompanyProfile';
import { Members } from '../features/company/Members';
import { Partners } from '../features/company/Partners';
import { CompanyMap } from '../features/company/CompanyMap';

export const Company = () => {
    return (
        <div className="pt-20">
            <Seo path="/company" />
            <CompanyProfile />
            <Members />
            <Partners />
            <CompanyMap />
        </div>
    );
};
