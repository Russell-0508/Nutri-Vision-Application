import { collection, query, where, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc, startOfDay, endOfDay } from 'firebase/firestore';
import firestore from './firebase/config';

const profileCollection = collection(firestore, 'profile');
const goalsDetailCollection = collection(firestore, 'goalsDetail');

// Function to fetch user's goals and their details
export const fetchUserGoalDetails = async (userEmail) => {
    try {
        // Query ProfileHistory to get the user's profile
        const profileQuery = query(profileCollection, where('email', '==', userEmail));
        const profileSnapshot = await getDocs(profileQuery);
        const userProfile = profileSnapshot.docs.map(doc => doc.data())[0]; // Assuming email is unique

        // Get the user's goals
        const userGoals = userProfile.goals;

        // Query goalsDetail to get details for each goal
        const goalsDetails = [];
        for (const goal of userGoals) {
            const goalQuery = query(goalsDetailCollection, where('goalName', '==', goal));
            const goalSnapshot = await getDocs(goalQuery);
            const goalDetails = goalSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0]; // Assuming goalName is unique
            goalsDetails.push(goalDetails);
        }

        return goalsDetails;
    } catch (error) {
        console.error('Error fetching user goals details:', error);
        throw error;
    }
};