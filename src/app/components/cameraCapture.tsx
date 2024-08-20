'use client';

import React, { useRef, useEffect, useState } from 'react';

const CameraCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setStream(stream);
      } catch (err) {
        setCameraError('Unable to access the camera. Please check permissions or use a supported device.');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        videoRef.current.play();
      }
      setStream(newStream);
    } catch (err) {
      setCameraError('Unable to access the camera. Please check permissions or use a supported device.');
    }
  };

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        const { videoWidth, videoHeight } = videoRef.current;

        // Define the border size you want to crop to
        const borderWidth = videoWidth * 0.80;
        console.log("border ", borderWidth) // 3/4th of the video width
        const borderHeight = 300; 

        // Calculate cropping dimensions based on border size
        const cropX = (videoWidth - borderWidth) / 2; // Center horizontally
        const cropY = (videoHeight - borderHeight) / 2; // Center vertically

        // Set canvas dimensions to match the border size
        canvasRef.current.width = borderWidth;
        canvasRef.current.height = borderHeight;

        // Draw the image from the video feed to the canvas, ensuring correct scaling
        context.drawImage(
          videoRef.current,
          cropX,
          cropY,
          borderWidth,
          250,
          0,
          0,
          borderWidth,
          borderHeight
        );

        // Get the cropped image data URL
        const imageUrl = canvasRef.current.toDataURL('image/png');

        // Update the state with the captured image URL
        setCapturedImage(imageUrl);
      }
    }
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setCameraError(null);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    startCamera();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 p-4">
      {cameraError && <p className="text-red-500">{cameraError}</p>}
      {!capturedImage ? (
        <>
          <video ref={videoRef} className="w-full h-auto bg-gray-500 rounded-md"></video>
          <canvas ref={canvasRef} className="hidden "></canvas>

          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
            <div className="border-4 border-green-500 w-3/4 h-[200px] md:w-3/4 md:h-2/4 mt-[-50px]"></div>
          </div>

          <button onClick={takePicture} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
            Capture
          </button>
        </>
      ) : (
        <>
          <div className="">
            <img src={capturedImage} alt="Captured" className='object-contain max-h-[60vw]   min-h-[60vw] border-2 bg-black border-green-400' />
          </div>
          <button onClick={resetCapture} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">
            Retake
          </button>
        </>
      )}
    </div>
  );
};

export default CameraCapture;
