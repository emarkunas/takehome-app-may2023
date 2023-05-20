// External packages
import { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';

// Utils / constants
import { COMPANIES_LIST as companiesJSON } from 'src/json/companies';

// Components
import NoDataContainer from './components/NoDataContainer';
import CompanyInfoCard from './components/CompanyInfoCard/CompanyInfoCard';

// Types
import { Company } from 'src/types/companies';

// Styles
import './BenefitsDashboard.scss';

const BenefitsDashboard = () => {
  const [allCompaniesInfoList, setAllCompaniesInfoList] = useState<Company[]>([]);

  /**
   * Load list of companies on initial render
   */
  useEffect(() => {
    if (companiesJSON?.length > 0) {
      setAllCompaniesInfoList(companiesJSON);
    }
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
