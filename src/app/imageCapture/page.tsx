'use client'
import CameraCapture from '../components/cameraCapture';


export default function Home() {
  const handleSaveImage = async (imageData: string) => {
    try {
      // Replace with your API URL and logic
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });
      const result = await response.json();
      console.log('Image uploaded successfully:', result);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  return (

    <div>
      <CameraCapture
        Customshape="oval"
        onCapture={() => console.log('Image captured')}
        onRetake={() => console.log('Retake image')}
        onSave={handleSaveImage}
        onShapeChange={() => console.log('Shape changed')}
      >
        {/* Custom buttons */}
        <button data-type="capture" className="px-4 py-2  bg-blue-500 text-white rounded-lg">
          Capture
        </button>
        <button data-type="flipCamera" className="px-4 py-2 bg-green-500 text-white rounded-lg">
          Flip Camera
        </button>
        <button data-type="retake" className="px-4 py-2 my-10 bg-blue-500 text-white rounded-lg">
          Retake
        </button>
        <button data-type="save" className="px-4 py-2 bg-purple-500 text-white rounded-lg">
          Save
        </button>
      </CameraCapture>
    </div>
  );
}
