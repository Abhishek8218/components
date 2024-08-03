'use client';
// 'use client';

// import React, { useEffect, useState } from 'react';
// import Chart from '../components/chart';
// import { fetchHouses, fetchProfile, fetchBlog, House, BlogInfo, Profile } from '../components/fetchData';
// import dynamic from 'next/dynamic';

// // Dynamically import the Tour component with SSR disabled
// const Tour = dynamic(() => import('reactour'), {
//   ssr: false,
// });

// const steps = [
//   {
//     selector: '.header',
//     content: 'This is the main header of the page.',
//     audio: '/audio/step1.mp3',
//   },
//   {
//     selector: '.profile-info',
//     content: 'Here is the profile information section.',
//     audio: '/audio/step2.mp3',
//   },
//   {
//     selector: '.chart-section',
//     content: 'This section displays various charts.',
//     audio: '/audio/step3.mp3',
//   },
//   {
//     selector: '.lagana-chart',
//     content: 'This section displays Lagana charts.',
//     audio: '/audio/step4.mp3',
//   },
//   {
//     selector: '.chandra-chart',
//     content: 'This section displays Chandra charts.',
//     audio: '/audio/step5.mp3',
//   },
//   {
//     selector: '.blog-section',
//     content: 'This is where the blog information is displayed.',
//     audio: '/audio/step6.mp3',
//   },
// ];

// const Page = () => {
//   const [houses, setHouses] = useState<House[]>([]);
//   const [blogInfo, setBlogInfo] = useState<BlogInfo[]>([]);
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
//   const [currentStep, setCurrentStep] = useState<number | null>(null);
//   const view = false;

//   const currentDate = new Date().toLocaleDateString('en-GB', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const housesData = await fetchHouses();
//         setHouses(housesData);

//         const profileData = await fetchProfile();
//         setProfile(profileData);

//         const blogData = await fetchBlog();
//         setBlogInfo(blogData);

//         setLoading(false);
//       } catch (error) {
//         setError((error as Error).message);
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChakraClick = (house: House) => {
//     if (!view) {
//       console.log('Data in Parent:', house);
//     }
//   };

//   if (loading) {
//     return (
//       <div classNameName='flex justify-center items-center h-screen'>
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div classNameName='w-full flex justify-center items-center overflow-hidden'>
//       <div classNameName='w-full sm:w-[98%] xl:w-[80%] md:border-[3px] md:border-[#ff883e] print:border-none select-none py-0 md:py-6 print:py-8'>
//         <div classNameName='header'>
//           <div classNameName='w-full flex justify-center items-center'>
//             <h1 classNameName='text-4xl text-center mt-3 print:mt-0 w-[150px]'>LOGO</h1>
//           </div>
          
//           <h1 classNameName='text-3xl font-bold text-center mt-3 print:mt-0 text-[#E76F23]'>Astro Sarthee</h1>
//           <p classNameName='text-center text-sm font-semibold'>Guide for Your Important Things in Life</p>
//           <h2 classNameName='text-center text-xl font-semibold mt-3'>
//             Astrologer - <span classNameName='text-[#E76F23]'>Bheem Singh</span>
//           </h2>
//         </div>

//         <hr classNameName='border-b-2 border-[#ff883e] mt-6 print:mt-2 w-full' />

//         <div classNameName='xl:flex xl:flex-col xl:justify-start xl:items-start print:flex-none'>
//           <div classNameName='profile-info text-left text-gray-600 font-semibold mt-8 text-[17px] px-10 md:pl-[200px] space-y-4'>
//             {profile ? (
//               <p>
//                 <p>Date: <span classNameName='font-medium text-[17px] text-gray-900'>{currentDate}</span></p>
//                 <div classNameName='flex flex-col print:flex-row print:gap-[10rem] md:flex-row justify-start items-start md:gap-[12.5rem]'>
//                   <div classNameName='flex flex-col gap-2'>
//                     <p>Name: <span classNameName='font-medium text-[17px] text-gray-900 mt-14'>{profile.fullName}</span></p>
//                     <p>Gender: <span classNameName='font-medium text-[17px] text-gray-900'>{profile.gender}</span></p>
//                     <p>Date of Birth: <span classNameName='font-medium text-[17px] text-gray-900'>{profile.dob}</span></p>
//                     <p>Nakshatra: <span classNameName='font-medium text-[17px] text-gray-900'>{profile.Nakshatra}</span></p>
//                     <p>Nakshatra Lord: <span classNameName='font-medium text-[17px] text-gray-900'>{profile.NakshatraLord}</span></p>
//                     <p>Chandra Rasi: <span classNameName='font-medium text-[17px] text-gray-900'>{profile.ChandraRasi}</span></p>
//                     <p>Chandra Rasi Lord: <span classNameName='font-medium text-[17px] text-gray-900'>{profile.ChandraRasiLord}</span></p>
//                   </div>
//                   <div classNameName='flex flex-col gap-2'>
//                     <p>Day of Birth: <span classNameName='font-medium text-[17px] text-gray-900'>{profile.day}</span></p>
//                     <p>Time of Birth: <span classNameName='font-medium text-[17px] text-gray-900'>{profile.timeOfBirth}</span></p>
//                     <p>City: <span classNameName='font-medium text-[17px] text-gray-900'>{profile.city}</span></p>
//                     <p>Zodiac Sign: <span classNameName='font-medium text-[17px] text-gray-900'>{profile.ZodiacSign}</span></p>
//                     <p>Deity: <span classNameName='font-medium text-[17px] text-gray-900'>{profile.Deity}</span></p>
//                     <p>Ganam: <span classNameName='font-medium text-[17px] text-gray-900'>{profile.Ganam}</span></p>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div classNameName='text-red-600'>Failed to load profile information.</div>
//             )}
//           </div>

//           <div classNameName='chart-section flex flex-col print:flex-row md:flex-row justify-center items-center print:gap-2 print:ml-0 md:gap-6 xl:ml-[-20px] lg:pl-[220px]'>
//             <div classNameName='lagana-chart'>
//               <h1 classNameName='text-xl font-bold text-center print:text-left print:ml-6 md:text-left mt-5 print:mt-5'>Lagna Chakra</h1>
//               {error ? (
//                 <div classNameName='text-red-600 text-center mt-4'>{error}</div>
//               ) : (
//                 <Chart houses={houses} onChakraClick={handleChakraClick} view={view} />
//               )}
//             </div>
//             <div classNameName='chandra-chart'>
//               <h1 classNameName='text-xl font-bold text-center print:text-left print:mr-2 md:text-left mt-5'>Chandra Chakra</h1>
//               {error ? (
//                 <div classNameName='text-red-600 text-center mt-4'>{error}</div>
//               ) : (
//                 <Chart houses={houses} onChakraClick={handleChakraClick} view={view} />
//               )}
//             </div>
//           </div>

//           <div classNameName='blog-section mt-8 px-10 md:px-[200px] print:mt-[200px] print:py-10'>
//             {blogInfo.length > 0 ? (
//               blogInfo.map((info, index) => (
//                 <div key={index} classNameName='mb-6'>
//                   <h2 classNameName='text-2xl font-semibold text-gray-800'>{info.heading}</h2>
//                   <p classNameName='mt-2 text-gray-700'>{info.paragraph}</p>
//                 </div>
//               ))
//             ) : (
//               <div classNameName='text-gray-600 text-center mt-4'>No blog information available.</div>
//             )}
//           </div>
//         </div>

//         <button onClick={() => setIsTourOpen(true)} classNameName="fixed bottom-10 right-10 bg-[#007bff] text-white px-4 py-2 rounded z-[999]">
//           Start Tour
//         </button>

//         {typeof window !== 'undefined' && (
//           <Tour
//             steps={steps}
//             isOpen={isTourOpen}
//             onRequestClose={() => setIsTourOpen(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Page;






import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

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
const step1= 0;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsTourOpen(true);
   
    // Adding a slight delay to ensure the tour is fully initialized before playing audio
  }, []);

  const handleStepChange = (stepIndex: number) => {
    console.log(`Step ${stepIndex} changed`);

    // Stop the previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Play the new audio
    const audio = new Audio(steps[stepIndex].audio);
    audioRef.current = audio; // Store the reference to the current audio
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
    });
  };

  return (
    <div>
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
            goToStep={step1}
            getCurrentStep={(stepIndex) => {handleStepChange(stepIndex)}}
            onRequestClose={() => setIsTourOpen(false)}
          />
        )}
    </div>
  )
}

export default Page
