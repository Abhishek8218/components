// components/TimePicker.tsx
'use client';
import { useEffect, useState } from 'react';
import TimeselectorModal from './Desktop/timeSelector';
import MobileTimePickerModal from './mobile/mobileTimeSelector';


interface TimePickerProps {
  onChange: (time: string) => void;
}

const TimeSelector: React.FC<TimePickerProps> = ({ onChange }) => {
  const [hour, setHour] = useState<number>(12);
  const [minute, setMinute] = useState<number>(0);
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleTimeChange = (hour: number, minute: number, ampm: 'AM' | 'PM') => {
    setHour(hour);
    setMinute(minute);
    setAmpm(ampm);
    const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
    onChange(time);
    setModalOpen(false);
  };

const handleReset = () => {
    setHour(12);
    setMinute(0);
    setAmpm('AM');
    setModalOpen(false);
  }


// Check if the user is using a mobile device
  const useUserAgent = () => {
    const [userAgent, setUserAgent] = useState('');
  
    useEffect(() => {
      setUserAgent(navigator.userAgent);
    }, []);
  
    return userAgent;
  };

  const userAgent = useUserAgent();

  const isMobile = /Mobi|Android|iPad|iPhone|iPod/i.test(userAgent);

  return (
    <div className='relative'>
      <button
        onClick={() => setModalOpen(true)}
        className="  flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md border border-gray-300"
      >
        <span>{hour.toString().padStart(2, '0')}</span>
        <span>:</span>
        <span>{minute.toString().padStart(2, '0')}</span>
        <span>{ampm}</span>
      </button>

      {isModalOpen && (
      
      isMobile ? <MobileTimePickerModal 
       hour={hour}
      minute={minute}
      ampm={ampm}
      onChange={handleTimeChange}
      onClose={() => setModalOpen(false)}
      onReset={handleReset}/> : (
        <TimeselectorModal
          hour={hour}
          minute={minute}
          ampm={ampm}
          onChange={handleTimeChange}
          onClose={() => setModalOpen(false)}
          onReset={handleReset}
        />
      )
    
    )}
    
    </div>
  );
};

export default TimeSelector;
