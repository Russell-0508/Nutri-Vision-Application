/**
 * Fetches nutritional information for a given query using the CalorieNinjas API.
 * This function sends an HTTP GET request to retrieve detailed nutritional data based on the provided food item or meal description.
 * 
 * @param {string} query - A string describing the food items or meal for which nutritional data is to be retrieved.
 * @returns {Promise<Object>} A promise that resolves to an object containing nutritional information.
 * @throws {Error} Throws an error if the fetch operation fails or if the API response is not ok.
 */
export const fetchNutritionalInfo = async (query) => {
    const apiKey = 'ZU5mjAQ4XCSqCf5coiK7Tg==2xon0PnMDSJJAMX7';
    try {
        const apiUrl = `https://api.calorieninjas.com/v1/nutrition?query=${query}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch nutritional information');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
};
