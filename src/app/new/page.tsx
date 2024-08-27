import React from 'react';
import StepProgress from '../timeline/timeline';
import { MaterialSymbol } from 'react-material-symbols';

const App = () => {
  const steps = [
    {
      title: 'France',
      description: 'This is success step',
      date: 'Sep 20',
      iconPath: React.createElement(MaterialSymbol, { icon: 'check_circle',size: 20,color: 'white' }),
      status: 'success',
    },
    {
      title: 'On the way to the plane',
      description: 'This is processing step',
      date: 'Sep 22',
      iconPath: React.createElement(MaterialSymbol, { icon: 'hourglass_empty',size: 18,color: 'white' }),
      status: 'processing',
    },
    {
      title: 'To London',
      description: 'This is warning step',
      date: 'Sep 28',
      iconPath: React.createElement(MaterialSymbol, { icon: 'warning',size: 18,color: 'white' }),
      status: 'warning',
    },
    {
      title: 'On the way to you',
      description: 'This is error step',
      date: 'Sep 30',
      iconPath: React.createElement(MaterialSymbol, { icon: 'error',size: 20,color: 'white' }),
      status: 'error',
    },
    {
      title: 'Wait outside the door',
      description: 'This is success step',
      date: 'Oct 4',
      iconPath: React.createElement(MaterialSymbol, { icon: 'check_circle',size: 20,color: 'white' }),
      status: 'success',
    },
    {
        title: 'Wait outside the door',
        description: 'This is step will be completed soon',
        date: 'Oct 4',
        iconPath: React.createElement(MaterialSymbol, { icon: 'check_circle',size: 20,color: 'white' }),
        status: 'success',
      },
  ];

  const currentStep = 4;

  return <StepProgress steps={steps} currentStep={currentStep} />;
};

export default App;
