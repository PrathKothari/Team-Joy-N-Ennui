"use client";
import { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { red } from "tailwindcss/colors";
const IngredientForm = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipie, setRecipie] = useState("");

  const handleChange = (e) => {
    setIngredients(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/recipie", {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(ingredients),
    });

    if (!response.ok) {
      alert("Error in uploading ingredients");
    }

    const resData = await response.json();
    console.log(resData);
    setRecipie(resData);

    alert(`Ingredients submitted: ${ingredients}`);
    setIngredients("");
  };

  return (
    <div>
      <div>
        {/* BackgroundBeams Component */}
        <BackgroundBeams className="absolute inset-0 z-0 opacity-30" />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-8 w-full max-w-md transform transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
              Ingredients Left
            </h2>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              rows="4"
              placeholder="Enter your ingredients here..."
              value={ingredients}
              onChange={handleChange}
            ></textarea>
            <button
              type="submit"
              className="mt-4 w-[200px]  bg-violet-500 text-white py-2 rounded-xl hover:bg-violet-700 transition-all duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IngredientForm;
