'use client';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([
    { label: 'sushi', confidence: 18 },
    { label: 'beet salad', confidence: 5 },
    { label: 'cup cakes', confidence: 4 },
    { label: 'escargots', confidence: 4 },
    { label: 'spring rolls', confidence: 4 },
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleClear = () => {
    setImage(null);
  };

  const handleSubmit = () => {
    // Simulate the model prediction process
    console.log('Submitting image...');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* BackgroundBeams Component */}
      <BackgroundBeams className="absolute inset-0 z-0 opacity-30" />

      {/* Main Content */}
      <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Food</h1>

        {/* Image and Results Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Image Upload Section */}
          <div className="border rounded-lg p-4 flex flex-col items-center">
            {image ? (
              <img src={image} alt="Uploaded food" className="w-full rounded-md" />
            ) : (
              <label
                htmlFor="imageUpload"
                className="border-dashed border-2 p-6 text-center w-full cursor-pointer"
              >
                <span className="block mb-2">Click to upload an image</span>
                <input
                  id="imageUpload"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          {/* Prediction Results */}
          <div className="border rounded-lg p-4">
            <h2 className="text-2xl mb-4 font-mono font-light">Predictions</h2>
            <ul className="space-y-2">
              {predictions.map((prediction, index) => (
                <li
                  key={index}
                  className={`flex justify-between p-2 ${
                    index === 0 ? 'bg-violet-100 font-bold' : 'bg-gray-50'
                  }`}
                >
                  <span>{prediction.label}</span>
                  <span>{prediction.confidence}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="mt-6 flex justify-between">
          <button
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="bg-violet-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
