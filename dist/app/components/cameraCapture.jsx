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
import React, { useRef, useEffect, useState } from 'react';
var CameraCapture = function (_a) {
    var Customshape = _a.Customshape, children = _a.children, onCapture = _a.onCapture, onRetake = _a.onRetake, onSave = _a.onSave, onShapeChange = _a.onShapeChange, _b = _a.captureButtonLabel, captureButtonLabel = _b === void 0 ? "Capture" : _b, _c = _a.retakeButtonLabel, retakeButtonLabel = _c === void 0 ? "Retake" : _c, _d = _a.saveButtonLabel, saveButtonLabel = _d === void 0 ? "Save" : _d, _e = _a.changeShapeButtonLabel, changeShapeButtonLabel = _e === void 0 ? "Change Shape" : _e;
    var videoRef = useRef(null);
    var canvasRef = useRef(null);
    var _f = useState(null), capturedImage = _f[0], setCapturedImage = _f[1];
    var _g = useState(null), cameraError = _g[0], setCameraError = _g[1];
    var _h = useState(null), stream = _h[0], setStream = _h[1];
    var _j = useState(), shape = _j[0], setShape = _j[1];
    var _k = useState(false), isUploading = _k[0], setIsUploading = _k[1];
    var _l = useState(false), uploaded = _l[0], setUploaded = _l[1];
    var _m = useState(true), isFrontCamera = _m[0], setIsFrontCamera = _m[1];
    var _o = useState(true), isLoading = _o[0], setIsLoading = _o[1]; // New state for loading screen
    useEffect(function () {
        var startCamera = function () { return __awaiter(void 0, void 0, void 0, function () {
            var stream_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setShape(Customshape);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia({
                                video: { facingMode: isFrontCamera ? 'user' : 'environment' },
                            })];
                    case 2:
                        stream_1 = _a.sent();
                        if (videoRef.current) {
                            videoRef.current.srcObject = stream_1;
                            videoRef.current.play();
                            setIsLoading(false); // Hide loading screen when video starts playing
                        }
                        setStream(stream_1);
                        setIsLoading(false);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        setCameraError('Unable to access the camera. Please check permissions or use a supported device.');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        startCamera();
        setUploaded(false);
        return function () {
            if (stream) {
                stream.getTracks().forEach(function (track) { return track.stop(); });
            }
        };
    }, [Customshape, isFrontCamera]);
    var captureImage = function () {
        var canvas = canvasRef.current;
        var video = videoRef.current;
        if (canvas && video) {
            var context = canvas.getContext('2d');
            if (context) {
                var videoWidth = video.videoWidth, videoHeight = video.videoHeight;
                var shapeWidth = void 0;
                var shapeHeight = void 0;
                var shapeX = void 0;
                var shapeY = void 0;
                if (shape === 'circle') {
                    shapeWidth = shapeHeight = Math.min(videoWidth, videoHeight) * 0.6;
                    shapeX = (videoWidth - shapeWidth) / 2.1;
                    shapeY = (videoHeight - shapeHeight) / 1.45;
                }
                else if (shape === 'square') {
                    shapeWidth = shapeHeight = Math.min(videoWidth, videoHeight) * 0.5;
                    shapeX = (videoWidth - shapeWidth) / 2;
                    shapeY = (videoHeight - shapeHeight) / 1.50;
                }
                else if (shape === 'oval') {
                    shapeWidth = Math.min(videoWidth, videoHeight) * 0.5;
                    shapeHeight = shapeWidth * 1.5;
                    shapeX = (videoWidth - shapeWidth) / 2;
                    shapeY = (videoHeight - shapeHeight) / 1.60;
                }
                else {
                    shapeWidth = videoWidth * 0.7;
                    shapeHeight = shapeWidth * 0.65;
                    shapeX = (videoWidth - shapeWidth) / 2.1;
                    shapeY = (videoHeight - shapeHeight) / 1.50;
                }
                canvas.width = shapeWidth;
                canvas.height = shapeHeight;
                context.drawImage(video, shapeX, shapeY, shapeWidth, shapeHeight, 0, 0, shapeWidth, shapeHeight);
                var croppedImage = canvas.toDataURL('image/png');
                setCapturedImage(croppedImage);
                if (onCapture) {
                    onCapture();
                }
            }
        }
    };
    var startCamera = function () { return __awaiter(void 0, void 0, void 0, function () {
        var newStream, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setUploaded(false);
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({
                            video: { facingMode: isFrontCamera ? 'user' : 'environment' }
                        })];
                case 1:
                    newStream = _a.sent();
                    if (videoRef.current) {
                        videoRef.current.srcObject = newStream;
                        videoRef.current.play();
                    }
                    setStream(newStream);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    setCameraError('Unable to access the camera. Please check permissions or use a supported device.');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var resetCapture = function () {
        setCapturedImage(null);
        setCameraError(null);
        if (stream) {
            stream.getTracks().forEach(function (track) { return track.stop(); });
        }
        setIsLoading(true); // Show loading screen when resetting
        startCamera();
        if (onRetake) {
            onRetake();
        }
    };
    var uploadImage = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(capturedImage && onSave)) return [3 /*break*/, 5];
                    setIsUploading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, onSave(capturedImage)];
                case 2:
                    _a.sent(); // Uploading image via provided callback
                    setUploaded(true);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error uploading image:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsUploading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleShapeChange = function () {
        if (shape === 'rectangle') {
            setShape('square');
        }
        else if (shape === 'square') {
            setShape('circle');
        }
        else if (shape === 'circle') {
            setShape('oval');
        }
        else {
            setShape('rectangle');
        }
        if (onShapeChange) {
            onShapeChange();
        }
    };
    var flipCamera = function () { return __awaiter(void 0, void 0, void 0, function () {
        var facingMode, newStream, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!stream) return [3 /*break*/, 4];
                    // Stop all existing tracks
                    stream.getTracks().forEach(function (track) { return track.stop(); });
                    facingMode = isFrontCamera ? 'environment' : 'user';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({
                            video: { facingMode: facingMode },
                        })];
                case 2:
                    newStream = _a.sent();
                    if (videoRef.current) {
                        videoRef.current.srcObject = newStream;
                        videoRef.current.play();
                    }
                    setStream(newStream);
                    setIsFrontCamera(function (prev) { return !prev; });
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    setCameraError('Unable to switch the camera. Please check permissions or use a supported device.');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="flex flex-col items-center justify-center h-screen bg-gray-800 w-full relative">
      {cameraError && <p className="text-red-500">{cameraError}</p>}
      {isLoading ? (<div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <p className="text-white text-lg">Loading...</p>
        </div>) : (<>
          {!capturedImage ? (<>
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
                  {children ? (React.Children.toArray(children).find(function (child) { return React.isValidElement(child) && child.props['data-type'] === 'capture'; }) || captureButtonLabel) : captureButtonLabel}
                </div>
                <div onClick={flipCamera}>
                  {children ? (React.Children.toArray(children).find(function (child) { return React.isValidElement(child) && child.props['data-type'] === 'flipCamera'; }) || changeShapeButtonLabel) : changeShapeButtonLabel}
                </div>
                
              </div>
            </>) : (<>
              <div className={"relative flex justify-center items-center"}>
                <div className="">
                  <img src={capturedImage} alt="Captured" className={"object-contain ".concat(shape === 'circle' ? 'rounded-full' : shape === 'oval' ? 'rounded-[50%]' : shape === 'square' ? 'rounded-lg' : '', " ").concat(isUploading ? 'image-container' : "", " ").concat(uploaded ? "border-4 border-green-400" : "border-4 border-white ")}/>
                </div>
              </div>
              <div onClick={resetCapture}>
                {children ? (React.Children.toArray(children).find(function (child) { return React.isValidElement(child) && child.props['data-type'] === 'retake'; }) || retakeButtonLabel) : retakeButtonLabel}
              </div>
              <div onClick={uploadImage}>
                {children ? (React.Children.toArray(children).find(function (child) { return React.isValidElement(child) && child.props['data-type'] === 'save'; }) || saveButtonLabel) : saveButtonLabel}
              </div>
            </>)}
        </>)}
    </div>);
};
export default CameraCapture;
