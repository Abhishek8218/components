'use client'


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
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
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
  },[])



  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
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
        
        // Calculate the aspect ratio
        const aspectRatio = videoWidth / videoHeight;
        const targetwidth = 270; 
        const targetheight = 200;// Desired size of the output image
  
        // Determine the dimensions for cropping
        let cropWidth, cropHeight;
        if (aspectRatio > 1) {
          // Landscape orientation
          cropWidth = videoWidth;
          cropHeight = videoWidth / aspectRatio;
        } else {
          // Portrait orientation
          cropWidth = videoHeight * aspectRatio;
          cropHeight = videoHeight;
        }
  
        // Calculate the crop position to center the image
        const cropX = (videoWidth - cropWidth) / 2;
        const cropY = (videoHeight - cropHeight) / 2;
  
        // Set canvas dimensions to the target size
        canvasRef.current.width = targetwidth;
        canvasRef.current.height = targetheight;
  
        // Draw the cropped image onto the canvas
        context.drawImage(videoRef.current, cropX, cropY, cropWidth, cropHeight, 0, 0, targetwidth, targetheight);
  
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
          <canvas ref={canvasRef} className="hidden"></canvas>

          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
            <div className="border-4 border-green-500 w-3/4 h-[200px] md:w-3/4 md:h-2/4 mt-[-50px]" ></div>
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
        <div className="w-3/4 flex justify-center items-center h-auto border-4 border-green-500 rounded-md md:w-2/4">
          <img src={capturedImage} alt="Captured"  />
          </div>
          <button
            onClick={resetCapture} 
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
