import { storage, collection, query, where, addDoc, getDocs, 
        getDoc, updateDoc, deleteDoc, doc, startOfDay, endOfDay } from 'firebase/firestore';
import firestore from './firebase/config';

const profileCollection = collection(firestore, 'profile');

/**
 * Saves profile data to the Firestore database and returns the new document ID.
 * @param {object} profileData - The profile data to be saved.
 * @returns {Promise<string>} The ID of the newly created document in the Firestore database.
 * @throws {Error} If there is an error saving the profile data.
 */
export const saveProfileToFirestore = async (profileData) => {
    try {
        const newDocRef = await addDoc(profileCollection, profileData);
        console.log('Profile saved successfully with ID:', newDocRef.id);
        return newDocRef.id;
    } catch (error) {
        console.error('Error saving profile:', error);
        throw error;
    }
};

/**
 * Retrieves profile(s) from Firestore based on the provided email.
 * @param {string} email - The email address to search for in the profile entries.
 * @returns {Promise<Array>} An array of profiles that match the given email.
 * @throws {Error} If there is an error fetching the profiles by email.
 */
export const getProfileByEmail = async (email) => {
    try {
        const q = query(profileCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        const profiles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Profile with email', email, ':', profiles);
        return profiles; 
    } catch (error) {
        console.error('Error fetching profile by email:', error);
        throw error;
    }
};

/**
 * Updates specific fields of a profile in Firestore.
 * @param {string} profileId - The ID of the profile to update.
 * @param {object} updatedData - The data to update in the profile.
 * @returns {Promise<void>} Resolves when the update is successful.
 * @throws {Error} If there is an error updating the profile data.
 */
export const updateProfileDataInFirestore = (profileId, updatedData) => {
    const profileRef = doc(profileCollection, profileId);

    updateDoc(profileRef, updatedData)
        .then(() => {
            console.log('Profile data updated successfully');
        })
        .catch((error) => {
            console.error('Error updating profile data:', error);
        });
};

/**
 * Deletes a profile from Firestore based on its ID.
 * @param {string} profileId - The ID of the profile to delete.
 * @returns {Promise<void>} Resolves when the profile is successfully deleted.
 * @throws {Error} If there is an error deleting the profile.
 */
export const deleteProfileDataInFirestore = (profileId) => {
    const profileRef = doc(profileCollection, profileId);

    deleteDoc(profileRef)
        .then(() => {
            console.log('Profile data deleted successfully');
        })
        .catch((error) => {
            console.error('Error deleting profile data:', error);
        });
};



