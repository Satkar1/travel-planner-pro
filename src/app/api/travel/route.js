import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { source, destination } = await request.json();
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are an expert travel planner assistant. Provide comprehensive travel options from ${source} to ${destination}. 
      Present the information in JSON format with the following structure:

      {
        "travelOptions": [
          {
            "mode": "Flight",
            "priceRange": "$200-$400",
            "duration": "2h 30m",
            "comfort": 4,
            "directness": "Direct",
            "description": "Commercial airline flight with meal service"
          },
          {
            "mode": "Train",
            "priceRange": "$50-$120",
            "duration": "5h 45m",
            "comfort": 3,
            "directness": "Direct",
            "description": "Comfortable train with seating options"
          }
        ]
      }

      Include at least these modes: Flight, Train, Bus, Rental Car, Taxi/Uber.
      Price ranges should be in USD. Duration in hours/minutes. Comfort 1-5 (5 best).
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response (Gemini sometimes adds markdown syntax)
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(cleanJson);

    // Get weather data (simplified - in production use OpenWeather API)
    const weatherData = {
      temperature: Math.round(Math.random() * 30),
      conditions: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
      icon: "01d"
    };

    return NextResponse.json({
      travelOptions: data.travelOptions,
      weatherData
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}