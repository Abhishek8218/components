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
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Rating from './components/Rating';
import CartCounter from './components/CartCounter';
import { MaterialSymbol } from 'react-material-symbols';
import ReactForm from './components/ReactForm';
import { useQuery, } from '@tanstack/react-query';
import SearchBar from './components/AutoSuggest';
import Input from './components/Input';
//import DatePicker from './components/DatePicker/DatePIcker';
import TimePicker from './components/TimePicker/TimePicker';
import DateRangePicker from './components/DateRangeSelector/RangeSelector';
import EventCalendar from './components/eventCalendar/eventCalendar';
import MultiSelectSearchBar from './components/multiSelectInput/multiSelectInput';
import MultiSelectDropdown from './components/multiSelectCheckBoxInput/multiSelectCheckBoxInput';
import SingleSelectDropdown from './components/singleSelectInput/singleSelectInput';
import TimeSelector from './components/TimeSelector/TimeSelector';
import { DatePicker } from "nextjs-ui-components";
// Dynamically import the LocationPicker component with SSR disabled
var LocationPicker = dynamic(function () { return import('./components/LocationPicker'); }, {
    ssr: false,
});
var suggestions = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Fig',
    'Grape',
    'Kiwi',
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Fig',
    'Grape',
    'Kiwi',
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Fig',
    'Grape',
    'Kiwi',
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Fig',
    'Grape',
    'apple book',
    'Kiwi',
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Fig',
    'Grape',
    'Kiwi',
];
var Home = function () {
    var _a = useState([]), houses = _a[0], setHouses = _a[1];
    var initialPosition = [30.3223292765723, 78.0467597766522];
    var zoomFeatures = {
        minZoom: 16,
        zoom: 18,
        maxZoom: 22,
        zoomControl: false,
    };
    var markerIcon = (<MaterialSymbol icon="location_on" size={32} fill grade={-25} color="black"/>);
    useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/houses.json')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setHouses(data);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    var handleRated = function (newRating) {
        console.log("The new rating is: ".concat(newRating));
    };
    var fetchFromLocalStorage = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = JSON.parse(localStorage.getItem('formData') || '[]');
            return [2 /*return*/, data];
        });
    }); };
    var _b = useQuery({ queryKey: ['formData'], queryFn: fetchFromLocalStorage }), data = _b.data, isLoading = _b.isLoading, isError = _b.isError;
    var _c = useState(''), selectedValue = _c[0], setSelectedValue = _c[1];
    var _d = useState(''), multiSelectInputValue = _d[0], setMultiSelectInputValue = _d[1];
    var _e = useState(''), singleSelectInputValue = _e[0], setSingleSelectInputValue = _e[1];
    var handleSelect = function (value) {
        setSelectedValue(value);
    };
    var handleMultiSelect = function (values) {
        console.log(values);
        setSingleSelectInputValue(values.join(', '));
    };
    var handleSingleSelect = function (value) {
        console.log(value);
        setSingleSelectInputValue(value);
    };
    var useUserAgent = function () {
        var _a = useState(''), userAgent = _a[0], setUserAgent = _a[1];
        useEffect(function () {
            setUserAgent(navigator.userAgent);
        }, []);
        return userAgent;
    };
    var userAgent = useUserAgent();
    var isMobile = /Mobi|Android/i.test(userAgent);
    var handleTimeChange = function (time) {
        console.log('Selected Time:', time);
    };
    return (<div className="flex flex-col justify-center items-center gap-16">
      <Rating stars={1} onRated={handleRated}/>
      <CartCounter maxValue={10} minValue={0}/>
      {data === null || data === void 0 ? void 0 : data.map(function (formData, index) { return (<div key={index} className="p-4 border rounded-md shadow-sm">
          <h3 className="text-xl font-bold">{formData === null || formData === void 0 ? void 0 : formData.firstName} {formData === null || formData === void 0 ? void 0 : formData.lastName}</h3>
          <p>Email: {formData === null || formData === void 0 ? void 0 : formData.email}</p>
        </div>); })} 
      <SearchBar suggestions={suggestions} onSelect={handleSelect}/>
      <p className="mt-4">Selected: {selectedValue}</p>
      <Input type='text' placeholder='Enter your name' onChange={function (event) { return console.log(event.target.value); }}/>
      <DatePicker />

    <TimePicker />
    <DateRangePicker />



    <div>
  {isMobile ? (<p>You are using a mobile device</p>) : (<p>You are using a desktop device</p>)}

 

  {/* Render different components based on user agent */}

    </div>
 <EventCalendar />

 <MultiSelectSearchBar suggestions={suggestions} onSelect={handleMultiSelect}/>
 <p className="mt-4">Selected: {multiSelectInputValue}</p>


 <p className='mb-[-55px] mr-10'>Multi Select Check BOx</p>
 <MultiSelectDropdown options={suggestions} onSelect={handleMultiSelect}/>

 <p className='mb-[-55px] mr-10'>Single Select Check BOx</p>
 <SingleSelectDropdown options={suggestions} onSelect={handleSingleSelect}/>
 <p>Single Select Value : {singleSelectInputValue}</p>

    <TimeSelector onChange={handleTimeChange}/>
    <div className='mt-[500px]'>h</div>


    <ReactForm />

    <DatePicker />



 
     {/* <Query/> */}
    </div>);
};
export default Home;
