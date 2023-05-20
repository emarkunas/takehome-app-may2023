import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card, { CardProps } from '@mui/material/Card';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

interface AppCardProps extends CardProps {
  cardClassName?: string;
  children: EmotionJSX.Element;
}

export default function AppCard({ cardClassName = '', children, ...otherProps }: AppCardProps) {
  return (
    <Card className={cardClassName} {...otherProps}>
      {children}
    </Card>
  );
}
