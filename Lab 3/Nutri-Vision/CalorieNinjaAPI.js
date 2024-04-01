// CalorieNinjasAPI.js

//const apiKey = 'ZU5mjAQ4XCSqCf5coiK7Tg==2xon0PnMDSJJAMX7';
const apiKey = '';
export const fetchNutritionalInfo = async (query) => {
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
        throw error; // Rethrow the error for the caller to handle
    }
};
