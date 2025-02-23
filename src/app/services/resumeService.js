import { GoogleGenerativeAI } from "@google/generative-ai";

export async function analyzeResume(file, jobDescription) {
  const reader = new FileReader();
  
  try {
    // Convert PDF to base64
    const base64String = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI("AIzaSyCFTixFFDthF4GYWhjsjAM6pyNgingTPg0");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Extract text from PDF
    const extractionResult = await model.generateContent([
      {
        inlineData: {
          data: base64String,
          mimeType: "application/pdf"
        }
      },
      "Extract and return all the text content from this PDF in a clean, structured format."
    ]);

    const extractedText = extractionResult.response.text();

    return {
      extractedText,
      jobDescription
    };
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
}
