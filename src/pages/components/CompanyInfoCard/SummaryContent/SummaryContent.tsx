import React, { useMemo } from 'react';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Types
import { Company } from 'src/types/companies';

// Constants
import { CARD_CONTENT_MIN_SCREEN, CARD_CONTENT_MEDIUM_AND_UP_SCREEN } from '../constants';

// Component imports
import CompanyCardSummaryLabelAndValue from './CompanyCardSummaryLabelAndValue';

interface SummaryContentProps {
  companyState: Company['company_state'];
  employeCount: Company['employee_count'];
  planYear: Company['plan_year'];
}

const SummaryContent = (props: SummaryContentProps) => {
  const theme = useTheme();
  const isMinScreenSize = useMediaQuery(theme.breakpoints.down('sm'));
  const cardContentStyleObject = useMemo(
    () => (isMinScreenSize ? CARD_CONTENT_MIN_SCREEN : CARD_CONTENT_MEDIUM_AND_UP_SCREEN),
    [isMinScreenSize]
  );
  return (
    <CardContent sx={cardContentStyleObject}>
      <CompanyCardSummaryLabelAndValue label={'State'} value={props?.companyState} />
      <CompanyCardSummaryLabelAndValue label={'Employees'} value={props?.employeCount} />
      <CompanyCardSummaryLabelAndValue label={'Year'} value={props?.planYear} />
    </CardContent>
  );
};

export default SummaryContent;
