import React from 'react';
import Head from 'next/head';
import { MaterialSymbol } from 'react-material-symbols';

const features = [
  { title: 'Dynamic Kundli', description: 'Generate and view dynamic Kundli charts instantly.' },
  { title: 'Kundli Generation', description: 'Create accurate Kundli charts with our advanced algorithms.' },
  { title: 'PDF Download', description: 'Download your Kundli charts in high-quality PDF format.' },
  { title: 'Astrology Predictions', description: 'Get detailed astrology predictions based on your Kundli.' },
  { title: 'Daily Horoscope', description: 'Check your daily horoscope and plan your day accordingly.' },
  { title: 'Compatibility Report', description: 'Analyze compatibility between partners using astrology.' },
  { title: 'Numerology Report', description: 'Get insights into your life path and destiny through numerology.' },
  { title: 'Planetary Transits', description: 'Track planetary transits and their effects on your life.' },
  { title: 'Astrology Articles', description: 'Read articles on various astrology topics written by experts.' },
  { title: 'Personal Consultations', description: 'Book personal consultations with professional astrologers.' },
];

const page = () => {
  return (
    <>
      <Head>
        <title>Astrology Website Features</title>
      </Head>
      <div className="relative min-h-screen text-gray-900">
        <div className="absolute inset-0 bg-[url('/atsro-bg-pattern.jpg')] bg-repeat bg-auto bg-center blur-[4px] opacity-70"></div>
        <div className="relative z-10 min-h-screen bg-opacity-70 ">
          <div className="container mx-auto px-10 py-12">
            <h1 className="text-5xl font-bold mb-12 text-left text-orange-900">Features</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-4">
                  <h2 className="relative text-2xl font-semibold mb-2 text-orange-700">
                    <span className='absolute top-0 left-[-45px]'>
                      <MaterialSymbol 
                        icon="nightlight" 
                        size={40}  
                        fill
                        grade={-25}
                        color="#dd6b20" 
                        className=''/>
                    </span>
                    {feature.title}
                  </h2>
                  <p className="text-lg">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
