import Typography from '@mui/material/Typography';

interface CompanyCardDetailLabelAndValueProps {
  label: string;
  value: string | number;
}

const CompanyCardDetailLabelAndValue = ({ label = '', value = '' }: CompanyCardDetailLabelAndValueProps) => (
  <Typography sx={{ display: 'flex', flexDirection: 'row' }} align="center" variant="body1" color="text.primary">
    <span style={{ fontWeight: 700, marginRight: '4px' }}>{`${label}:`}</span>
    <span style={{ fontWeight: 400 }}>{value}</span>
  </Typography>
);

export default CompanyCardDetailLabelAndValue;
