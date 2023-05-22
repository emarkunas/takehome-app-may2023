// External packages
import { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';

// Utils / constants
import { COMPANIES_LIST as companiesJSON } from 'src/json/companies';

// Components
import NoDataContainer from '../components/NoDataContainer';
import CompanyInfoCard from '../components/CompanyInfoCard/CompanyInfoCard';

// Types
import { Company } from 'src/types/companies';

// Styles
import './BenefitsDashboard.scss';

/**
 * Used for displaying list of companies and their benefits information. All
 * cards have detail containers that are collapsed by default
 */
const BenefitsDashboard = () => {
  const [allCompaniesInfoList, setAllCompaniesInfoList] = useState<Company[]>([]);

  /**
   * Load list of companies on initial render and set document title (should be moved to router when implemented)
   */
  useEffect(() => {
    if (companiesJSON?.length > 0) {
      // By default sort alphebetically by company name
      setAllCompaniesInfoList(companiesJSON.sort((a, b) => (a?.company_name < b?.company_name ? -1 : 1)));
    }

    document.title = 'My Benefits Dashboard';
  }, []);

  return (
    <article className="benefitsDashboard">
      {isEmpty(allCompaniesInfoList) && <NoDataContainer />}
      {allCompaniesInfoList?.length > 0 && (
        <section className="benefitsDashboardList">
          {allCompaniesInfoList.map((company) => (
            <CompanyInfoCard key={`${company.company_name}_${company.plan_year}`} company={company} />
          ))}
        </section>
      )}
    </article>
  );
};

export default BenefitsDashboard;
