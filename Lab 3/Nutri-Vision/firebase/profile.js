import { db } from './config';
import { getFirestore, collection, getDocs, doc, addDoc } from 'firebase/firestore/lite';


const profileCollection = collection(db, 'profile');

export const createProfileToFirestore = async (profileData) => {
    try {
        // Add a new document to the 'profile' collection from CreateProfile UI
        const profileRef = addDoc(profileCollection, profileData);
        console.log('Profile data saved successfully with ID: ', profileRef.id);
        return profileRef.id;
    } catch (error) {
        console.error('Error saving profile data:', error);
        throw error;
    }
};

export const getProfileFromFirestore = async () => {
    // ProfilePage UI
    try {
        const querySnapshot = await profileCollectionRef.collection('profile').get();
        const profiles = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('Profiles:', profiles);
        return profiles;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
};

export const editProfileInFirestore = (profileId, updatedData) => {
    // To be in the editProfile UI
    // Reference to the specific profile document using its ID
    const profileRef = profileCollectionRef.collection('profile').doc(profileId);

    // Update the data
    profileRef.update(updatedData)
        .then(() => {
            console.log('Profile data updated successfully');
        })
        .catch((error) => {
            console.error('Error updating profile data:', error);
        });
};