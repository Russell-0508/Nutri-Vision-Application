/**
 * Sends a base64 encoded image to an API for food identification and estimation. This function assumes the image
 * content needs to be analyzed to identify and quantify food items present in the image.
 *
 * @param {string} base64Image - The base64 encoded string of the image to be analyzed.
 * @returns {Promise<string>} A promise that resolves to the API response as a stringified JSON object.
 * @throws {Error} Throws an error if the request fails, detailing the issues encountered during the API call.
 *
 */
export async function sendImageToAPI(base64Image) {
  const api_key = process.env.OPENAI_API_KEY;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${api_key}`
  };

  const payload = {
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Identify Foods in this image, and estimate the amount of food. Frame your answer in the following way: 500g Pork chop , 300g Rice , 100g Coleslaw. You do not have to warn the user about it being an approximation or estimation, and using such words are not necessary."
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`
            }
          }
        ]
      }
    ],
    max_tokens: 300
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    const jsonResponse = await response.json();
    return JSON.stringify(jsonResponse);
    // Handle the response data as needed
  } catch (error) {
    console.error("Error sending image to API:", error);
  }
};