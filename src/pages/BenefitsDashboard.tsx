import { useState, useEffect } from 'react';
import { COMPANIES_LIST as companiesJSON } from 'src/json/companies';
import { Company } from 'src/types/companies';

// Components
import NoDataContainer from './components/NoDataContainer';

// Utils
import { isEmpty } from 'lodash';

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
    <article>
      {isEmpty(allCompaniesInfoList) && <NoDataContainer />}
      {allCompaniesInfoList?.length > 0 && (
        <section>
          {allCompaniesInfoList.map((company) => (
            <div key={`${company.company_name}_${company.plan_year}`}>{company.company_name}</div>
          ))}
        </section>
      )}
    </article>
  );
};

export default BenefitsDashboard;
