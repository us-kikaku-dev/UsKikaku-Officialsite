import { CompanyProfile } from '../components/CompanyProfile';
import { Members } from '../components/Members';
import { Partners } from '../components/Partners';
import { CompanyMap } from '../components/CompanyMap';

export const Company = () => {
    return (
        <div className="pt-20">
            <CompanyProfile />
            <Members />
            <Partners />
            <CompanyMap />
        </div>
    );
};
