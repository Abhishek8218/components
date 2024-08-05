'use client';





import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Modal from '../components/PopupModel';

// Dynamically import the Tour component with SSR disabled
const Tour = dynamic(() => import('reactour'), {
  ssr: false,
});

const steps = [
  {
    selector: '.account-access',
    content: 'You Can Access Your account from Here.',
    audio: '/audio/step.mp3',
  },
  {
    selector: '.username',
    content: 'Here is your username.',
    audio: '/audio/step2.mp3',
  },
  {
    selector: '.follow',
    content: 'Button to Follow',
    audio: '/audio/step.mp3',
  },
  {
    selector: '.profile-pic',
    content: 'This is your profile picture.',
    audio: '/audio/step2.mp3',
  },
  {
    selector: '.post',
    content: 'This section shows your posts.',
    audio: '/audio/step.mp3',
  },
  {
    selector: '.single-post',
    content: 'This section shows your single post.',
    audio: '/audio/step.mp3',
  },
];

const Page = () => {
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [nextStep, setNextStep] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tourRef = useRef<any>(null);

  useEffect(() => {
    // Start the tour after a 1-second delay
    const timer = setTimeout(() => {
     setIsModalOpen(true);
    }, 1000); // 1000 milliseconds = 1 second

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, []);




if(!isTourOpen) {
  console.log("Tour closed");
  audioRef.current?.pause();
}

  const handleStepChange = (stepIndex: number) => {
    console.log(`Step ${stepIndex} changed`);

    // Stop the previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      console.log(`Audio for step ${stepIndex} has been stopped`);
    }

    // Play the new audio
    const audio = new Audio(steps[stepIndex].audio);
    audioRef.current = audio; 
  // Store the reference to the current audio
  audio.play();



    audio.addEventListener('ended', () => {
      console.log(`Audio for step ${stepIndex} has finished playing`);
      if (stepIndex < steps.length - 1) {
        setTimeout(() => {
          setCurrentStep(stepIndex + 1); 
        }, 500);
        
      } else {
        console.log("Tour completed");
        setIsTourOpen(false); // Optionally close the tour
      }
    });
    
  };



  const startTour = () => {
    setIsModalOpen(false);
    setIsTourOpen(true);
    handleStepChange(0);
  };


  return (
    <div className=''>

{/* Pop Model to start the tour */}

<Modal  isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartTour={startTour}
        />





      {/* Nav */}
      <nav className="border-b px-4 py-2 bg-white">
        <div className="flex flex-wrap items-center justify-between md:justify-around">
          {/* Logo */}
          <Image className="h-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/150px-Instagram_logo.svg.png" alt="instagram" width={40} height={40} />

          <div className="relative hidden sm:block text-gray-500">
            <input className="search-bar max-w-xs border rounded bg-gray-200 px-4 text-center outline-none focus:border-gray-400" type="search" placeholder="Search" />
            <i className="fa fa-search absolute top-0 left-0 ml-12 mt-1"></i>
          </div>

          <div className="account-access space-x-4">
            <a className="inline-block bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded" href="#">Log In</a>
            <a className="inline-block text-blue-500 font-semibold text-sm" href="#">Sign Up</a>
          </div>
        </div>
      </nav>

      <main className="bg-gray-100 bg-opacity-25">
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap items-center p-4 md:py-8">
            <div className="md:w-3/12 md:ml-16">
              {/* Profile image */}
              <Image className="profile-pic w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1" src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80" alt="profile" width={100} height={100} />
            </div>

            {/* Profile meta */}
            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="username text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                  mrtravlerrr_
                </h2>

                {/* Badge */}
                <span className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2" aria-hidden="true">
                  <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
                </span>

                {/* Follow button */}
                <a href="#" className= "follow  bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block">Follow</a>
              </div>

              {/* Post, following, followers list for medium screens */}
              <ul className=" hidden md:flex space-x-8 mb-4">
                <li>
                  <span className="font-semibold">136</span> posts
                </li>
                <li>
                  <span className="font-semibold">40.5k</span> followers
                </li>
                <li>
                  <span className="font-semibold">302</span> following
                </li>
              </ul>

              {/* User meta for medium screens */}
              <div className="hidden md:block">
                <h1 className="font-semibold">Mr Travlerrr...</h1>
                <span>Travel, Nature and Music</span>
                <p>Lorem ipsum dolor sit amet consectetur</p>
              </div>
            </div>

            {/* User meta for small screens */}
            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">Mr Travlerrr...</h1>
              <span>Travel, Nature and Music</span>
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>
          </header>

          {/* Posts */}
          <div className="px-px md:px-3">
            {/* User following for mobile only */}
            <ul className="   flex md:hidden justify-around space-x-8 border-t text-center p-2 text-gray-600 leading-snug text-sm">
              <li>
                <span className="font-semibold text-gray-800 block">136</span> posts
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">40.5k</span> followers
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">302</span> following
              </li>
            </ul>

            {/* Insta features */}
            <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
              {/* Posts tab is active */}
              <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                <a className="post inline-block p-3" href="#">
                  <i className="fas fa-th-large text-xl md:text-xs"></i>
                  <span className=" md:inline">post</span>
                </a>
              </li>
              <li>
                <a className="inline-block p-3" href="#">
                  <i className="far fa-square text-xl md:text-xs"></i>
                  <span className="md:inline">igtv</span>
                </a>
              </li>
              <li>
                <a className="inline-block p-3" href="#">
                  <i className="hidden md:inline fas fa-user border border-gray-500 px-1 pt-1 rounded text-xl md:text-xs"></i>
                  <span className=" md:inline">tagged</span>
                </a>
              </li>
            </ul>

            {/* Flexbox grid */}
            <div className="flex flex-wrap -mx-px md:-mx-3 gap-20">
              {/* Column */}
              <div className="w-1/3 p-px md:px-3">
                {/* Post 1 */}
                <a href="#">
                  <article className="post  h-[300px] bg-gray-100 text-white relative pb-full md:mb-6">
                    {/* Post image */}
                    <Image className="single-post w-full h-full absolute left-0 top-0 object-cover" src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="image" width={100} height={100} />

                    <i className="fas fa-square absolute right-0 top-0 m-1"></i>

                    {/* Overlay */}
                    <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                      <div className="flex justify-center items-center space-x-4 h-full">
                        <span className="p-2">
                          <i className="fas fa-heart"></i> 412K
                        </span>
                        <span className="p-2">
                          <i className="fas fa-comment"></i> 2,909
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>

              <div className="w-1/3 p-px md:px-3">
                <a href="#">
                  {/* Post 2 */}
                  <article className="post h-[300px] bg-gray-100 text-white relative pb-full md:mb-6">
                    <Image className="w-full h-full absolute left-0 top-0 object-cover" src="https://images.unsplash.com/photo-1498409570040-05bf6d3dd5b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="image" width={100} height={100} />

                    {/* Overlay */}
                    <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                      <div className="flex justify-center items-center space-x-4 h-full">
                        <span className="p-2">
                          <i className="fas fa-heart"></i> 412K
                        </span>
                        <span className="p-2">
                          <i className="fas fa-comment"></i> 1,993
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>

              <div className="w-1/3 p-px md:px-3">
                <a href="#">
                  <article className="post h-[300px] bg-gray-100 text-white relative pb-full md:mb-6">
                    <Image className="w-full h-full absolute left-0 top-0 object-cover" src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="image" width={100} height={100} />

                    {/* Overlay */}
                    <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                      <div className="flex justify-center items-center space-x-4 h-full">
                        <span className="p-2">
                          <i className="fas fa-heart"></i> 112K
                        </span>
                        <span className="p-2">
                          <i className="fas fa-comment"></i> 2,090
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>

              <div className="w-1/3 p-px md:px-3">
                <a href="#">
                  <article className="post h-[300px] bg-gray-100 text-white relative pb-full md:mb-6">
                    <Image className="w-full h-full absolute left-0 top-0 object-cover" src="https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="image"  width={100} height={100}/>

                    <i className="fas fa-video absolute right-0 top-0 m-1"></i>

                    {/* Overlay */}
                    <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                      <div className="flex justify-center items-center space-x-4 h-full">
                        <span className="p-2">
                          <i className="fas fa-heart"></i> 841K
                        </span>
                        <span className="p-2">
                          <i className="fas fa-comment"></i> 909
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>

              <div className="w-1/3 p-px md:px-3">
                <a href="#">
                  <article className="post h-[300px] bg-gray-100 text-white relative pb-full md:mb-6">
                    <Image className="w-full h-full absolute left-0 top-0 object-cover" src="https://images.unsplash.com/photo-1475688621402-4257c812d6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80" alt="image"  width={400} height={400} />

                    {/* Overlay */}
                    <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                      <div className="flex justify-center items-center space-x-4 h-full">
                        <span className="p-2">
                          <i className="fas fa-heart"></i> 120K
                        </span>
                        <span className="p-2">
                          <i className="fas fa-comment"></i> 3,909
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
     

        {typeof window !== 'undefined' && (
          <Tour
            steps={steps}
            isOpen={isTourOpen}
           
            getCurrentStep={(stepIndex) => {handleStepChange(stepIndex)}}
            onRequestClose={() => setIsTourOpen(false)}
            goToStep={currentStep}
            className='bg-red-500'
          />
        )}
    </div>
  )
}

export default Page
