'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useEffect, useState } from 'react';
import Chart from '../components/chart';
import { fetchHouses, fetchProfile, fetchBlog } from '../components/fetchData';
var Page = function () {
    useEffect(function () {
        // Add the zoom class to the body element
        document.body.classList.add('zoom-04');
        // Clean up the class when the component unmounts
        return function () {
            document.body.classList.remove('zoom-04');
        };
    }, []);
    var _a = useState([]), houses = _a[0], setHouses = _a[1];
    var _b = useState([]), blogInfo = _b[0], setBlogInfo = _b[1];
    var _c = useState(null), profile = _c[0], setProfile = _c[1];
    var _d = useState(null), error = _d[0], setError = _d[1];
    var _e = useState(true), loading = _e[0], setLoading = _e[1];
    var view = false;
    var currentDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var housesData, profileData, blogData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, fetchHouses()];
                    case 1:
                        housesData = _a.sent();
                        setHouses(housesData);
                        return [4 /*yield*/, fetchProfile()];
                    case 2:
                        profileData = _a.sent();
                        setProfile(profileData);
                        return [4 /*yield*/, fetchBlog()];
                    case 3:
                        blogData = _a.sent();
                        setBlogInfo(blogData);
                        setLoading(false);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        setError(error_1.message);
                        console.error('Error fetching data:', error_1);
                        setLoading(false);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    var handleChakraClick = function (house) {
        if (!view) {
            console.log('Data in Parent:', house);
        }
    };
    if (loading) {
        return (<div className='flex justify-center items-center h-screen'>
        <p>Loading...</p>
      </div>);
    }
    return (<div className='w-full flex justify-center items-center overflow-hidden'>
      <div className='w-full sm:w-[98%] xl:w-[80%] md:border-[3px] md:border-[#ff883e] print:border-none select-none py-0  md:py-6 print:py-8'>
        <div>
          <div className='w-full flex justify-center items-center'><h1 className='text-4xl text-center mt-3 print:mt-0 w-[150px]'>LOGO</h1></div>
          
          <h1 className='text-3xl font-bold text-center mt-3 print:mt-0 text-[#E76F23]'>Astro Sarthee</h1>
          <p className='text-center text-sm font-semibold '>Guide for Your Important Things in Life</p>
          <h2 className='text-center text-xl font-semibold mt-3'>
            Astrologer - <span className='text-[#E76F23]'>Bheem Singh</span>
          </h2>
        </div>


        <hr className='border-b-2 border-[#ff883e] mt-6 print:mt-2 w-full'/>
    <div className='xl:flex xl:flex-col xl:justify-start xl:items-start print:flex-none '>
        <div className='text-left text-gray-600 font-semibold mt-8 text-[17px] px-10 md:pl-[200px] space-y-4'>
          {profile ? (<>
              <p>Date: <span className='font-medium text-[17px] text-gray-900'>{currentDate}</span></p>
            <div className='flex flex-col print:flex-row print:gap-[10rem] md:flex-row justify-start items-start md:gap-[12.5rem]'>
              <div className='flex flex-col gap-2'>
              <p>Name: <span className='font-medium text-[17px] text-gray-900 mt-14'>{profile.fullName}</span></p>
              <p>Gender: <span className='font-medium text-[17px] text-gray-900'>{profile.gender}</span></p>
              <p>Date of Birth: <span className='font-medium text-[17px] text-gray-900'>{profile.dob}</span></p>
              <p>Nakshatra: <span className='font-medium text-[17px] text-gray-900'>{profile.Nakshatra}</span></p>
              <p>Nakshatra Lord: <span className='font-medium text-[17px] text-gray-900'>{profile.NakshatraLord}</span></p>
              <p>Chandra Rasi: <span className='font-medium text-[17px] text-gray-900'>{profile.ChandraRasi}</span></p>
              <p>Chandra Rasi Lord: <span className='font-medium text-[17px] text-gray-900'>{profile.ChandraRasiLord}</span></p>
              </div>
              <div className='flex flex-col gap-2'>
              <p>Day of Birth: <span className='font-medium text-[17px] text-gray-900'>{profile.day}</span></p>
              <p>Time of Birth: <span className='font-medium text-[17px] text-gray-900'>{profile.timeOfBirth}</span></p>
              <p>City: <span className='font-medium text-[17px] text-gray-900'>{profile.city}</span></p>
              <p>Zodiac Sign: <span className='font-medium text-[17px] text-gray-900'>{profile.ZodiacSign}</span></p>
              <p>Deity: <span className='font-medium text-[17px] text-gray-900'>{profile.Deity}</span></p>
              <p>Ganam: <span className='font-medium text-[17px] text-gray-900'>{profile.Ganam}</span></p>
              </div>
              </div>
            </>) : (<div className='text-red-600'>Failed to load profile information.</div>)}
        </div>

        <div className='flex gap-5 print:flex-row  md:flex-row justify-center items-center print:gap-2 print:ml-0 md:gap-6  xl:ml-[-20px] lg:pl-[220px] '>
          <div className=''>
            <h1 className='text-xl font-bold text-center print:text-left print:ml-6  md:text-left mt-5 print:mt-5'>Lagna Chakra</h1>
            {error ? (<div className='text-red-600 text-center mt-4 '>{error}</div>) : (<Chart houses={houses} onChakraClick={handleChakraClick} view={view}/>)}
          </div>
          <div>
            <h1 className='text-xl font-bold text-center print:text-left print:mr-2 md:text-left mt-5'>Chandra Chakra</h1>
            {error ? (<div className='text-red-600 text-center mt-4'>{error}</div>) : (<Chart houses={houses} onChakraClick={handleChakraClick} view={view}/>)}
          </div>
        </div>

        <div className='mt-8 px-10 md:px-[200px] print:mt-[200px] print:py-10'>
          {blogInfo.length > 0 ? (blogInfo.map(function (info, index) { return (<div key={index} className='mb-6'>
                <h2 className='text-2xl font-semibold text-gray-800'>{info.heading}</h2>
                <p className='mt-2 text-gray-700'>{info.paragraph}</p>
              </div>); })) : (<div className='text-gray-600 text-center mt-4'>No blog information available.</div>)}
        </div>
        </div>
      </div>
    </div>);
};
export default Page;
