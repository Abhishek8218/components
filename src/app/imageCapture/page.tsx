import Head from 'next/head';
import CameraCapture from '../components/cameraCapture';


export default function Home() {
  return (
    <div>
      <Head>
        <title>Document Photo Clicker</title>
        <meta name="description" content="Capture document photos with a canvas overlay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CameraCapture />
      </main>
    </div>
  );
}
