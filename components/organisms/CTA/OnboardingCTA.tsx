import React from 'react';
import Button, { PrimaryButtonProps } from '@/components/atoms/Button';
import CTAView from '@/components/atoms/View/CTAView';

interface OnboardingCTAProps {
  buttons: {
    content: string;
    variant?: PrimaryButtonProps['variant'];
    onPress?: () => void;
    disabled?: boolean;
  }[];
}

function OnboardingCTA({ buttons }: OnboardingCTAProps) {
  return (
    <CTAView>
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant={button.variant || 'contained'}
          size="large"
          fullWidth
          onPress={button.onPress}
          disabled={button.disabled}
        >
          {button.content}
        </Button>
      ))}
    </CTAView>
  );
}

export default OnboardingCTA;
