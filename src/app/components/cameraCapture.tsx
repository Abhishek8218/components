'use client';

import React, { useRef, useEffect, useState } from 'react';

type CameraCaptureProps = {
  Customshape: 'rectangle' | 'square' | 'circle' | 'oval';
};




const CameraCapture: React.FC<CameraCaptureProps> = ({ Customshape }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [shape, setShape] = useState<CameraCaptureProps['Customshape']>('rectangle');
  const [isUploading, setIsUploading] = useState<boolean>(false);
const [Uplaoded, setUplaoded] = useState<boolean>(false);
  useEffect(() => {
    const startCamera = async () => {
      setShape(Customshape);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          videoRef.current.autofocus = true;
        }
        setStream(stream);
      } catch (err) {
        setCameraError('Unable to access the camera. Please check permissions or use a supported device.');
      }
    };

    startCamera();
    setUplaoded(false);

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [Customshape]);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
  
    if (canvas && video) {
      const context = canvas.getContext('2d');
      if (context) {
        const { videoWidth, videoHeight } = video;
  
        let shapeWidth: number;
        let shapeHeight: number;
        let shapeX: number;
        let shapeY: number;
  
        if (shape === 'circle') {
          shapeWidth = shapeHeight = Math.min(videoWidth, videoHeight) * 0.6;
          shapeX = (videoWidth - shapeWidth) / 2.1;
          shapeY = (videoHeight - shapeHeight) / 1.45;
        } else if (shape === 'square') {
          shapeWidth = shapeHeight = Math.min(videoWidth, videoHeight) * 0.5;
          shapeX = (videoWidth - shapeWidth) /2;
          shapeY = (videoHeight - shapeHeight) / 1.50;
        } else if (shape === 'oval') {
          shapeWidth = Math.min(videoWidth, videoHeight) * 0.5;
          shapeHeight = shapeWidth * 1.5;
          shapeX = (videoWidth - shapeWidth) / 2;
          shapeY = (videoHeight - shapeHeight) / 1.35;
        } else {
          shapeWidth = videoWidth * 0.7;
          shapeHeight = shapeWidth * 0.65;
          shapeX = (videoWidth - shapeWidth) / 2.1;
          shapeY = (videoHeight - shapeHeight) / 1.50;
        }
  
        canvas.width = shapeWidth;
        canvas.height = shapeHeight;
  
        context.drawImage(video, shapeX, shapeY, shapeWidth, shapeHeight, 0, 0, shapeWidth, shapeHeight);
  
        const croppedCanvas = document.createElement('canvas');
        const croppedContext = croppedCanvas.getContext('2d')!;
        croppedCanvas.width = shapeWidth;
        croppedCanvas.height = shapeHeight;
  
        croppedContext.drawImage(
          canvas,
          0,
          0,
          shapeWidth,
          shapeHeight,
          0,
          0,
          shapeWidth,
          shapeHeight
        );
  
        const croppedImage = croppedCanvas.toDataURL('image/png');
        setCapturedImage(croppedImage);
      }
    }
  };
  
  const handleShape = () => {
    if (shape === 'rectangle') {
      setShape('square');
    } else if (shape === 'square') {
      setShape('circle');
    } else if (shape === 'circle') {
      setShape('oval');
    } else {
      setShape('rectangle');
    }
  }
  
  const startCamera = async () => {
    try {
      setUplaoded(false);
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

  const resetCapture = () => {
    setCapturedImage(null);
    setCameraError(null);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    startCamera();
  };

  const mockUploadImage = async () => {
    return new Promise((resolve) => { 
      setTimeout(resolve, 5000)

    });
    
  };

  const uploadImage = async () => {
    if (capturedImage) {
      setIsUploading(true);
      console.log('Uploading image...');
      try {
        await mockUploadImage();
        setUplaoded(true);
        console.log('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsUploading(false);
        console.log('Upload complete');

      }
    }
  };
  const saveImage = async () => {
    setIsUploading(true);
    setUplaoded(false);
    // Simulate API upload
    setTimeout(() => {
      setIsUploading(false);
      setUplaoded(true);
      // Here you would handle the real API upload
    }, 3000); // Simulate a 3-second upload
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 w-full relative">
      {cameraError && <p className="text-red-500">{cameraError}</p>}
      {!capturedImage ? (
        <>
          <video ref={videoRef} className="w-full h-auto bg-gray-500 rounded-md"></video>
          <canvas ref={canvasRef} className="hidden"></canvas>

          <div className="absolute top-0 left-0 bottom-0 w-full h-full flex justify-center items-center pointer-events-none">
            {shape === 'rectangle' && <div className="border-4 border-green-500 w-3/4 h-[190px] rounded-lg"></div>}
            {shape === 'square' && <div className="border-4 border-green-500 w-2/4 h-1/4 rounded-lg"></div>}
            {shape === 'circle' && <div className="border-4 border-green-500 rounded-full w-[250px] h-[250px]"></div>}
            {shape === 'oval' && <div className="border-4 border-green-500 w-[200px] h-[300px] rounded-[50%]"></div>}
          </div>

          <button onClick={captureImage} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
            Capture
          </button>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg" onClick={handleShape}>
            Change Shape
          </button>
        </>
      ) : (
        <> 
        <div className={`relative flex justify-center items-center  `}>
        <div className="">
              <img
                src={capturedImage}
                alt="Captured"
                className={`object-contain ${shape === 'circle' ? 'rounded-full' : shape === 'oval' ? 'rounded-[50%]' : shape === 'square' ? 'rounded-lg' : ''}   ${isUploading ? 'image-container' : " "} ${Uplaoded ? "border-4 border-green-400" : "border-4 border-white "}`}
              />
            </div>
          </div>
          <button onClick={resetCapture} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">
            Retake
          </button>
          <button onClick={saveImage} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg">
            Save
          </button>
        </>
      )}

    </div>
  );
};

export default CameraCapture;