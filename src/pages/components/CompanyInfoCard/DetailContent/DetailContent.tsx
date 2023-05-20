// Package Imports
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { blue } from '@mui/material/colors';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

// Utils
import { formatNumber, NUMBER_FORMAT_TYPES } from 'src/utils/formatUtils';

// Types
import { Company } from 'src/types/companies';

// Component imports
import CompanyCardDetailLabelAndValue from './CompanyCardDetailLabelAndValue';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface DetailContentProps {
  premium: Company['premium_sum'];
  participants: Company['participants_sum'];
  brokerCommissions: Company['broker_commission_sum'];
}

const DetailContent = (props: DetailContentProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ color: blue[400] }} align="center" variant="subtitle1">
          {expanded ? 'Show less' : 'Show more'}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label={expanded ? 'show less' : 'show more'}
          sx={{ marginLeft: '0' }}
        >
          <ExpandMoreIcon sx={{ color: blue[400] }} />
        </ExpandMore>
      </CardContent>
      <Collapse
        sx={{
          textAlign: 'center',
        }}
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent
          sx={{
            display: 'inline-block',
            textAlign: 'left',
          }}
        >
          <CompanyCardDetailLabelAndValue
            label={'Premium'}
            value={formatNumber(props.premium, NUMBER_FORMAT_TYPES.SHORT_CURRENCY)}
          />
          <CompanyCardDetailLabelAndValue label={'Participants'} value={formatNumber(props.participants)} />
          <CompanyCardDetailLabelAndValue
            label={'Broker comissions'}
            value={formatNumber(props.brokerCommissions, NUMBER_FORMAT_TYPES.SHORT_CURRENCY)}
          />
        </CardContent>
      </Collapse>
    </>
  );
};

export default DetailContent;
