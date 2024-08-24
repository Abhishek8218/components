'use client';

import React, { useRef, useEffect, useState, ReactNode } from 'react';

type CameraCaptureProps = {
  Customshape: 'rectangle' | 'square' | 'circle' | 'oval';
  children?: ReactNode; // Accept custom buttons as children
  //flipCameraButton?: ReactNode; // Accept a custom button for flipping the camera
  onCapture?: () => void;
  onRetake?: () => void;
  onSave?: (imageData: string) => void;
  onShapeChange?: () => void;
  captureButtonLabel?: string;
  retakeButtonLabel?: string;
  saveButtonLabel?: string;
  changeShapeButtonLabel?: string;
};

const CameraCapture: React.FC<CameraCaptureProps> = ({
  Customshape,
  children,

  onCapture,
  onRetake,
  onSave,
  onShapeChange,
  captureButtonLabel = "Capture",
  retakeButtonLabel = "Retake",
  saveButtonLabel = "Save",
  changeShapeButtonLabel = "Change Shape",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [shape, setShape] = useState<CameraCaptureProps['Customshape']>();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true); // New state for loading screen

  useEffect(() => {
    const startCamera = async () => {
      setShape(Customshape);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: isFrontCamera ? 'user' : 'environment' },
         
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsLoading(false); // Hide loading screen when video starts playing
        }
        setStream(stream);
        setIsLoading(false);
      } catch (err) {
        setCameraError('Unable to access the camera. Please check permissions or use a supported device.');
      }
    };

    startCamera();
    setUploaded(false);

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [Customshape, isFrontCamera]);

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
          shapeX = (videoWidth - shapeWidth) / 2;
          shapeY = (videoHeight - shapeHeight) / 1.50;
        } else if (shape === 'oval') {
          shapeWidth = Math.min(videoWidth, videoHeight) * 0.5;
          shapeHeight = shapeWidth * 1.5;
          shapeX = (videoWidth - shapeWidth) / 2;
          shapeY = (videoHeight - shapeHeight) / 1.60;
        } else {
          shapeWidth = videoWidth * 0.7;
          shapeHeight = shapeWidth * 0.65;
          shapeX = (videoWidth - shapeWidth) / 2.1;
          shapeY = (videoHeight - shapeHeight) / 1.50;
        }

        canvas.width = shapeWidth;
        canvas.height = shapeHeight;

        context.drawImage(video, shapeX, shapeY, shapeWidth, shapeHeight, 0, 0, shapeWidth, shapeHeight);

        const croppedImage = canvas.toDataURL('image/png');
        setCapturedImage(croppedImage);

        if (onCapture) {
          onCapture();
        }
      }
    }
  };



  const startCamera = async () => {
    try {
      setUploaded(false);
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: isFrontCamera ? 'user' : 'environment' }
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
    setIsLoading(true); // Show loading screen when resetting
    startCamera();
    if (onRetake) {
      onRetake();
    }
  };

  const uploadImage = async () => {
    if (capturedImage && onSave) {
      setIsUploading(true);
      try {
        await onSave(capturedImage); // Uploading image via provided callback
        setUploaded(true);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleShapeChange = () => {
    if (shape === 'rectangle') {
      setShape('square');
    } else if (shape === 'square') {
      setShape('circle');
    } else if (shape === 'circle') {
      setShape('oval');
    } else {
      setShape('rectangle');
    }

    if (onShapeChange) {
      onShapeChange();
    }
  };

  const flipCamera = async () => {
    if (stream) {
      // Stop all existing tracks
      stream.getTracks().forEach((track) => track.stop());
  
      // Switch between front and back camera
      const facingMode = isFrontCamera ? 'environment' : 'user';
  
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        });
  
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
          videoRef.current.play();
        }
  
        setStream(newStream);
        setIsFrontCamera((prev) => !prev);
      } catch (err) {
        setCameraError('Unable to switch the camera. Please check permissions or use a supported device.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 w-full relative">
      {cameraError && <p className="text-red-500">{cameraError}</p>}
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <p className="text-white text-lg">Loading...</p>
        </div>
      ) : (
        <>
          {!capturedImage ? (
            <>
              <video ref={videoRef} className="w-full h-auto mt-20 rounded-md mb-10"></video>
              <canvas ref={canvasRef} className="hidden"></canvas>

              <div className="absolute top-0 left-0 bottom-0 w-full h-full flex justify-center items-center pointer-events-none">
                {shape === 'rectangle' && <div className="border-4 border-green-500 w-3/4 h-[190px] rounded-lg"></div>}
                {shape === 'square' && <div className="border-4 border-green-500 w-2/4 h-1/4 rounded-lg"></div>}
                {shape === 'circle' && <div className="border-4 border-green-500 rounded-full w-[250px] h-[250px]"></div>}
                {shape === 'oval' && <div className="border-4 border-green-500 w-[220px] h-[300px] rounded-[50%]"></div>}
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div onClick={captureImage}>
                  {children ? (React.Children.toArray(children).find(child => React.isValidElement(child) && child.props['data-type'] === 'capture') || captureButtonLabel) : captureButtonLabel}
                </div>
                <div onClick={flipCamera}>
                  {children ? (React.Children.toArray(children).find(child => React.isValidElement(child) && child.props['data-type'] === 'flipCamera') || changeShapeButtonLabel) : changeShapeButtonLabel}
                </div>
                
              </div>
            </>
          ) : (
            <>
              <div className={`relative flex justify-center items-center`}>
                <div className="">
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className={`object-contain ${shape === 'circle' ? 'rounded-full' : shape === 'oval' ? 'rounded-[50%]' : shape === 'square' ? 'rounded-lg' : ''} ${isUploading ? 'image-container' : ""} ${uploaded ? "border-4 border-green-400" : "border-4 border-white "}`}
                  />
                </div>
              </div>
              <div onClick={resetCapture}>
                {children ? (React.Children.toArray(children).find(child => React.isValidElement(child) && child.props['data-type'] === 'retake') || retakeButtonLabel) : retakeButtonLabel}
              </div>
              <div onClick={uploadImage}>
                {children ? (React.Children.toArray(children).find(child => React.isValidElement(child) && child.props['data-type'] === 'save') || saveButtonLabel) : saveButtonLabel}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CameraCapture;
