import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from './config';

const mealHistoryCollection = collection(firestore, 'MealHistory');

export const saveMealToFirestore = async (mealData) => {
    try {
        // Add a new document to the 'MealHistory' collection
        const newDocRef = await addDoc(mealHistoryCollection, mealData);
        console.log('Meal data saved successfully with ID: ', newDocRef.id);
        return newDocRef.id;
    } catch (error) {
        console.error('Error saving meal data:', error);
        throw error;
    }
};

export const getMealHistoryFromFirestore = async () => {
    try {
        // Get all documents from the 'MealHistory' collection
        const querySnapshot = await getDocs(mealHistoryCollection);
        const mealHistory = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('Meal history:', mealHistory);
        return mealHistory;
    } catch (error) {
        console.error('Error fetching meal history:', error);
        throw error;
    }
};

export const updateMealDataInFirestore = (mealId, updatedData) => {
    // Reference to the specific meal document using its ID
    const mealRef = firestoreRef.collection('mealHistory').doc(mealId);

    // Update the data
    mealRef.update(updatedData)
        .then(() => {
            console.log('Meal data updated successfully');
        })
        .catch((error) => {
            console.error('Error updating meal data:', error);
        });
};

export const deleteMealDataInFirestore = (mealId) => {
    // Reference to the specific meal document using its ID
    const mealRef = firestoreRef.collection('mealHistory').doc(mealId);

    // Delete the document
    mealRef.delete()
        .then(() => {
            console.log('Meal data deleted successfully');
        })
        .catch((error) => {
            console.error('Error deleting meal data:', error);
        });
};

