// import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react'

// function useLocalStorage<T>(key: string, initialValue: T, parseValue: (v: string | null) => T) {
//   const [item, setValue] = useState<T>(() => {
//     const value = parseValue(localStorage.getItem(key))
//     return value || initialValue
//   })

//   const setItem = (newValue: T) => {
//     setValue(newValue)
//     window.localStorage.setItem(key, JSON.stringify(newValue))
//   }

//   return [item, setItem] as const
// }

// function formatTime(ms: number) {
//   const totalSeconds = Math.ceil(ms / 1000)
//   const minutes = Math.floor(totalSeconds / 60)
//   const seconds = totalSeconds % 60
//   return `${minutes}:${seconds.toString().padStart(2, '0')}`
// }

// const OTPInput = forwardRef<HTMLInputElement, {}>((props, ref) => {
//   return (
//     <input
//       type="text"
//       ref={ref}
//       maxLength={6}
//       pattern="\d{6}"
//       placeholder="Enter OTP"
//       className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg"
//     />
//   )
// })

// OTPInput.displayName = 'OTPInput';

// function OTPVerification() {
//   const initialTime = 30 * 1000 // 30 seconds in milliseconds
//   const [startTime, setStartTime] = useLocalStorage<number | null>(
//     'otp:countdown:startTime',
//     null,
//     (v) => Number(v),
//   )
//   const [lapse, setLapse] = useLocalStorage<number>(
//     'otp:countdown:time',
//     initialTime,
//     (v) => Number(v),
//   )
//   const [running, setRunning] = useLocalStorage<boolean>(
//     'otp:countdown:running',
//     false,
//     (v) => v === 'true',
//   )
//   const timerRef = useRef<number>()
//   const inputRef = useRef<HTMLInputElement>(null)

//   useEffect(() => {
//     if (running) {
//       const start = startTime || Date.now()
//       setStartTime(start)
//       timerRef.current = window.setInterval(() => {
//         const timePassed = Date.now() - start
//         const remainingTime = initialTime - timePassed
//         if (remainingTime <= 0) {
//           setLapse(0) // Show "Resend" button when time is up
//           setRunning(false) // Stop the timer
//         } else {
//           setLapse(Math.ceil(remainingTime / 1000) * 1000) // Round up to the nearest second
//         }
//       }, 1000)
//     } else {
//       clearInterval(timerRef.current)
//     }

//     return () => clearInterval(timerRef.current)
//   }, [running, startTime, setStartTime, setLapse])

//   useEffect(() => {
//     if (!running && lapse > 0) {
//       setRunning(true)
//     }
//   }, [lapse, running, setRunning])

//   const resendOTP = () => {
//     setLapse(initialTime)
//     setStartTime(Date.now())
//     setRunning(true)
//     if (inputRef.current) inputRef.current.value = ''
//   }

//   return (
//     <div className="max-w-sm mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
//       <div className="mb-4 text-center text-xl font-semibold">Enter your OTP</div>
//       <OTPInput ref={inputRef} />
//       <div className="mt-4 text-center">
//         {lapse > 0 ? (
//           <span className="text-gray-700">
//             Resend OTP in {formatTime(lapse)}
//           </span>
//         ) : (
//           <button
//             onClick={resendOTP}
//             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             Resend OTP
//           </button>
//         )}
//       </div>
//     </div>
//   )
// }


