import React from 'react';

// Define types as described above
type Step = {
  title: string;
  description: string;
  date: string;
  icon?: string;
  iconPath?: React.ReactNode; 
  status?: string
};

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
}

const statusColors: { [key: string]: string } = {
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  processing: 'bg-blue-500',
  error: 'bg-red-500',
};


const StepProgress: React.FC<StepProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="p-4 max-w-md mx-auto pt-20 flow-root">
      <ul role="list" className="-mb-8">
        {steps.map((step, index) => (
          <li key={index}>
            <div className={`relative pb-8 ${index < steps.length - 1 ? '' : 'pb-0'}`}>
              {index < steps.length - 1 && (
                <span
                  className={`absolute left-[0.65rem] top-[1.25rem] -ml-px h-[62%] w-0.5 z-10 ${
                    index < currentStep && steps[index].status ?  'bg-green-500': 'bg-gray-200'
                  }`}
             
                />
              )}
              <div className=" flex space-x-3">
                <div>
                <span
                    className={`h-5 w-5 rounded-full flex items-center justify-center ring-8 ring-white ${
                      index <= currentStep ? (step.status ? statusColors[step.status] : 'bg-gray-400') : 'bg-gray-200'
                    }`}
                  >
                   {step.iconPath ? step.iconPath : step.icon}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 mt-[-10px]">
                  <div>
                    <p className="text-sm text-gray-500">
                     <span className='font-semibold text-gray-800'>{step.title}</span> <br/>
                     <span className='text-xs'>{step.description}</span> 
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={step.date}>{step.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepProgress;
