import { CompanyProfile } from '../components/CompanyProfile';
import { Members } from '../components/Members';
import { CompanyMap } from '../components/CompanyMap';

export const Company = () => {
    return (
        <div className="pt-20">
            {/* Page content runs here */}
            <CompanyProfile />
            <Members />
            <CompanyMap />
        </div>
    );
};
