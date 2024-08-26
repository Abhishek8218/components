"use client";
// components/Rating.js
import { useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
var Rating = function (_a) {
    var stars = _a.stars, onRated = _a.onRated;
    var _b = useState(stars), value = _b[0], setValue = _b[1];
    var _c = useState(stars), rating = _c[0], setRating = _c[1];
    var handleClick = function (newValue) {
        setValue(newValue);
        setRating(newValue);
        if (onRated) {
            onRated(newValue);
        }
    };
    var handleMouseEnter = function (newValue) {
        setRating(newValue);
    };
    var handleMouseLeave = function () {
        setRating(value);
    };
    var starsList = [];
    var _loop_1 = function (Star) {
        starsList.push(<span key={Star} className="star cursor-pointer" onMouseEnter={function () { return handleMouseEnter(Star); }} onMouseLeave={handleMouseLeave} onClick={function () { return handleClick(Star); }}>

        <MaterialSymbol icon="star" size={32} fill={Star <= rating ? false : true} grade={-25} color={Star <= rating ? 'yellow' : '#E8EAED'} className=''/>

      </span>);
    };
    for (var Star = 1; Star <= 5; Star++) {
        _loop_1(Star);
    }
    return <div className='flex justify-center items-center'>
    
    {starsList}
    
    </div>;
};
export default Rating;
