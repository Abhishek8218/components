'use client'


import React, { useRef, useEffect, useState } from 'react';

const CameraCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    // Request camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch(err => {
          setCameraError('Unable to access the camera. Please check permissions.');
        });
    } else {
      setCameraError('Camera is not supported on this device.');
    }
  }, []);

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        const { videoWidth, videoHeight } = videoRef.current;

        // Set canvas dimensions same as the video feed
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Define the cropping rectangle
        const cropX = (videoWidth / 4); // Change as needed
        const cropY = (videoHeight / 4); // Change as needed
        const cropWidth = videoWidth / 2; // Change as needed
        const cropHeight = videoHeight / 2; // Change as needed

        // Draw the image from the video feed to the canvas
        context.drawImage(videoRef.current, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

        // Get the cropped image data URL
        const imageUrl = canvasRef.current.toDataURL('image/png');
        
        // Update the state with the captured image URL
        setCapturedImage(imageUrl);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 p-4">
      {cameraError && <p className="text-red-500">{cameraError}</p>}
      {!capturedImage ? (
        <>
          <video ref={videoRef} className="w-full h-[450px] bg-gray-500 rounded-md"></video>
          <canvas ref={canvasRef} className="hidden"></canvas>

          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
            <div className="border-4 border-green-500 w-3/4 h-[250px] md:w-3/4 md:h-2/4 mt-20"></div>
          </div>

          <button 
            onClick={takePicture} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Capture
          </button>
        </>
      ) : (
        <>
          <img src={capturedImage} alt="Captured" className="w-3/4 h-auto border-4 border-green-500 rounded-md md:w-2/4" />
          <button
            onClick={() => setCapturedImage(null)} 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Retake
          </button>
        </>
      )}
    </div>
  );
};

export default CameraCapture;
