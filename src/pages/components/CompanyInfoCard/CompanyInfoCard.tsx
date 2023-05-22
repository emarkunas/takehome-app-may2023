// Package Imports
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// Local component Imports
import AppCard from 'src/components/AppCard/AppCard';
import DetailContent from './DetailContent/DetailContent';
import SummaryContent from './SummaryContent/SummaryContent';

// Types
import { Company } from 'src/types/companies';

interface CompanyInfoCardProps {
  company: Company;
}

export default function CompanyInfoCard(props: CompanyInfoCardProps) {
  return (
    <AppCard sx={{ maxWidth: 800, marginBottom: '24px' }}>
      <>
        <CardContent>
          <Typography sx={{ fontWeight: 700 }} align="center" variant="h6" color="text.primary">
            {props?.company?.company_name ?? 'Name missing'}
          </Typography>
        </CardContent>
        <SummaryContent
          companyState={props?.company?.company_state}
          employeCount={props?.company?.employee_count}
          planYear={props?.company?.plan_year}
        />
        <Divider sx={{ margin: '0 4px' }} />
        <DetailContent
          premium={props?.company?.premium_sum}
          participants={props?.company?.participants_sum}
          brokerCommissions={props?.company?.broker_commission_sum}
        />
      </>
    </AppCard>
  );
}
