import React, { useState, useEffect } from "react";
import { MaterialSymbol } from "react-material-symbols";
import YearModal from "./PCs/YearModal";
import MobileYearModal from "./Android/YearModal";

const YearPicker = () => {
  const [showYearModal, setShowYearModal] = useState(false);
  const [date, setDate] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());
  const [month, setMonth] = useState<number>(new Date().getMonth());

  // Format a date into a "dd-mm-yyyy" string
  const formatDate = (day: number, month: number, year: number) => {
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month + 1).padStart(2, "0"); // Months are zero-based
    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  // Update the selected date when the year is selected
  const updateDate = (year: number): void => {
    setDate(formatDate(selectedDate, month, year));
  };

  console.log("date is ", date);

  // Functions to handle the year modal
  const handleYearModal = () => {
    setShowYearModal(true);
  };

  const handleYearSelect = (selectedYear: number) => {
    setYear(selectedYear);
    setShowYearModal(false);
    updateDate(selectedYear);
  };

  const handleYearModalClose = () => {
    setShowYearModal(false);
  };

  const closeModals = () => {
    setShowYearModal(false);
  };

  // Function to set the current year
  const setCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
    setShowYearModal(false);
    updateDate(currentYear);
  };

  // Function to reset the date
  const resetDate = () => {
    setDate("");
  };

  // Function to check if the device is mobile
  const useUserAgent = () => {
    const [userAgent, setUserAgent] = useState("");

    useEffect(() => {
      setUserAgent(navigator.userAgent);
    }, []);

    return userAgent;
  };

  const userAgent = useUserAgent();
  const isMobile = /Mobi|Android/i.test(userAgent);

  return (
    <div className="relative">
      {showYearModal && (
        <div
          className="fixed inset-0 min-h-full bg-opacity-50 z-40"
          onClick={closeModals}
        />
      )}
     <div className={`flex items-center justify-center relative ${isMobile ? "" : "z-50"} `}>
        <div className="antialiased sans-serif">
          <div className="container mx-auto px-4 py-2 md:py-10">
            <div className="mb-5 w-64">
              <label
                className="font-bold mb-1 text-gray-700 block"
                htmlFor="datepicker"
              >
                Select Year
              </label>
              <div className="relative">
                <input type="hidden" name="date" />
                <input
                  type="text"
                  readOnly
                  value={date}
                  onClick={() => setShowYearModal(!showYearModal)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") closeModals();
                  }}
                  className="w-[270px] pl-4 pr-10 py-3 leading-none rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                  placeholder="Select date"
                />

                {date ? (
                  <div className="absolute top-0 right-0 px-3 py-2">
                    <MaterialSymbol
                      icon="close"
                      size={28}
                      color="gray"
                      onClick={resetDate}
                    />
                  </div>
                ) : (
                  <div
                    className="absolute top-0 right-0 px-3 py-2"
                    onClick={() => setShowYearModal(!showYearModal)}
                  >
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}

                {showYearModal &&
                  (isMobile ? (
                    <MobileYearModal
                      year={year}
                      showYearModal={showYearModal}
                      handleYearSelect={handleYearSelect}
                      handleYearModalClose={handleYearModalClose}
                      setCurrentYear={setCurrentYear}
                    />
                  ) : (
                    <YearModal
                      year={year}
                      showYearModal={showYearModal}
                      handleYearSelect={handleYearSelect}
                      handleYearModalClose={handleYearModalClose}
                      setCurrentYear={setCurrentYear}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearPicker;
