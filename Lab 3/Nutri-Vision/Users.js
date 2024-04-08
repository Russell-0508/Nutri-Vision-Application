import { storage, collection, query, where, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc, startOfDay, endOfDay } from 'firebase/firestore';
import firestore from './firebase/config';

// YY please continue. Creating user account, which is subsequently used for login authentication
const userCollection = collection(firestore, 'user');