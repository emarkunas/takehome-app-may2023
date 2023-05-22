import Typography from '@mui/material/Typography';

interface CompanyCardSummaryLabelAndValueProps {
  label: string;
  value: string | number;
}

const CompanyCardSummaryLabelAndValue = ({ label = '', value = '' }: CompanyCardSummaryLabelAndValueProps) => (
  <Typography sx={{ display: 'flex', flexDirection: 'column' }} align="center" variant="body1" color="text.primary">
    <span>{label}</span>
    <span style={{ fontWeight: 700, marginTop: '12px' }}>{value}</span>
  </Typography>
);

export default CompanyCardSummaryLabelAndValue;
