import { NextResponse } from "next/server";

export async function POST(req) {
  const { ingredient } = await req.json();
  console.log("ingredient:", ingredient);
  try {
    const response = await fetch("http://127.0.0.1:5000/recipies", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(ingredient),
    });

    if (!response.ok) {
      return NextResponse.json({
        message: "Error in posting data to the backed",
      });
    }
    const resData = await response.json();
    return NextResponse.json(
      { message: "Recipie generated succesfully", payload: resData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unexpected Error occured" },
      { status: 500 }
    );
  }
}
