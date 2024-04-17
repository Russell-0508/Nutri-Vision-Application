import { collection, query, where, getDocs } from 'firebase/firestore';
import firestore from './firebase/config';

const profileCollection = collection(firestore, 'profile');
const goalsDetailCollection = collection(firestore, 'goalsDetail');

/**
 * Contains predefined nutritional goals for various user targets. 
 * These details include daily goals for calorie intake, protein, carbohydrates, and fats.
 */
const goalDetailsMap = {
    'Eat Healthier': { Calories: 2500, Protein: 84, Carbs: 350, Fats: 75 },
    'Gain Weight': { Calories: 3000, Protein: 105, Carbs: 415, Fats: 85 },
    'Get Fitter': { Calories: 2500, Protein: 126, Carbs: 350, Fats: 60 },
    'Lose Weight': { Calories: 2000, Protein: 84, Carbs: 245, Fats: 60 },
    "I don't know yet": { Calories: 2500, Protein: 84, Carbs: 350, Fats: 75 },
    'default': { Calories: 2500, Protein: 84, Carbs: 350, Fats: 75 }
};

/**
 * Fetches the goal details of a user based on their email. If the user has no specific goals set, a default set of goals is provided.
 * @param {string} userEmail - The email address of the user whose goal details are to be fetched.
 * @returns {Promise<Object>} A promise that resolves to an object containing the user's goal details.
 * @throws {Error} Throws an error if no profile is found for the given email or if there's an issue accessing the data.
 */
export const fetchUserGoalDetails = async (userEmail) => {
    try {
        // Query ProfileHistory to get the user's profile
        const profileQuery = query(profileCollection, where('email', '==', userEmail));
        const profileSnapshot = await getDocs(profileQuery);
        if (!profileSnapshot.empty) {
            const userProfile = profileSnapshot.docs[0].data(); // Assuming email is unique
            const userGoals = userProfile.goals || 'default'; // Fallback to default if no goals are set
            console.log('UserGoal:', userGoals);

            // Retrieve goal details based on user goals
            return goalDetailsMap[userGoals] || goalDetailsMap['default'];
        } else {
            throw new Error('No profile found for the given email');
        }

    } catch (error) {
        console.error('Error fetching user goals details:', error);
        throw error;
    }
};

/**
 * Checks if a logged meal's calorie count fits within a target range based on the user's goals.
 * @param {string} userEmail - The email address of the user.
 * @param {number} mealCalories - The calorie count of the meal to check against the user's target.
 * @returns {Promise<boolean>} A promise that resolves to true if the meal fits within the target range, otherwise false.
 * @throws {Error} Throws an error if there's a problem fetching the user's goal details or calculating the target fit.
 */
export const checkMealTarget = async (userEmail, mealCalories) => {
    try {
        // Fetch user's goal details
        const goalDetails = await fetchUserGoalDetails(userEmail);

        // Calculate calorie target for each meal
        const dailyCalories = goalDetails.Calories;
        const mealTargetCalories = dailyCalories / 3; // Divide the daily calories by 3 for each meal
        console.log('Meal Target Calories:', mealTargetCalories);
        console.log('Calories logged', mealCalories);

        // Check if the logged meal's calories are within the target range
        const isTargetFit = mealCalories <= mealTargetCalories;

        return isTargetFit;
    } catch (error) {
        console.error('Error checking meal target:', error);
        throw error;
    }
};

