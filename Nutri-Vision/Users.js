import { storage, collection, query, where, addDoc, getDocs, 
        getDoc, updateDoc, deleteDoc, doc, startOfDay, endOfDay } from 'firebase/firestore';
import firestore from './firebase/config';


const userCollection = collection(firestore, 'user');

/**
 * Saves user data to the Firestore database and returns the new document ID.
 * @param {object} userData - The user data to be saved.
 * @returns {Promise<string>} The ID of the newly created document in the Firestore database.
 * @throws {Error} If there is an error saving the user data.
 */
export const saveUserToFirestore = async (userData) => {
    try{
        const newDocRef = await addDoc(userCollection, userData);
        console.log("User saved successfully with ID: ", newDocRef.id);
        return newDocRef.id;
    } catch (error){
        console.error("Error saving User: ", error);
        throw error;
    }
};


/**
 * Retrieves user(s) from Firestore based on the provided email.
 * @param {string} email - The email address to search for in the user entries.
 * @returns {Promise<Array>} An array of users that match the given email.
 * @throws {Error} If there is an error fetching the users by email.
 */
export const getUserByEmail = async (email) => {
    try {
        const q = query(userCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map(doc=> ({id: doc.id, ...doc.data()}));
        console.log("User with email", email, ":", users);
        return users;
    } catch (error) {
        console.error("Error fetching user by email: ", error);
        throw error;
    }
};

/**
 * Updates specific fields of a user's data in Firestore.
 * @param {string} userId - The ID of the user to update.
 * @param {object} updatedData - The data to update for the user.
 * @returns {Promise<void>} Resolves when the update is successful, logs the outcome.
 * @throws {Error} If there is an error updating the user data.
 */
export const updateUserDataInFirestore = (userId, updatedData) => {
    const userRef = doc(userCollection, userId);

    updateDoc(userRef, updatedData)
        .then(() => {
            console.log('User data updated successfully');
        })
        .catch((error) => {
            console.error('Error updating user data:', error);
        });
};

/**
 * Deletes a user from Firestore based on their ID.
 * @param {string} userId - The ID of the user to delete.
 * @returns {Promise<void>} Resolves when the user is successfully deleted, logs the outcome.
 * @throws {Error} If there is an error deleting the user data.
 */
export const deleteUserDataInFirestore = (userId) => {
    const userRef = doc(userCollection, userId);

    deleteDoc(userRef)
        .then(() => {
            console.log('User data deleted successfully');
        })
        .catch((error) => {
            console.error('Error deleting user data:', error);
        });
};