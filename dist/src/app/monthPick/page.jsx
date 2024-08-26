'use client';
import React from 'react';
import MonthYearPicker from '../components/monthYearPicker/monthYearPIcker';
import MonthPicker from '../components/monthPicker/monthPIcker';
import YearPicker from '../components/yearPicker/yearPIcker';
var page = function () {
    return (<div>
        <MonthYearPicker />
        <div><MonthPicker /></div>
        <YearPicker />
    </div>);
};
export default page;
