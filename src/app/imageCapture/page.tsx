import Head from 'next/head';
import CameraCaptureProps from '../components/cameraCapture';


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <CameraCaptureProps Customshape='rectangle' />
    </div>
  );
}
