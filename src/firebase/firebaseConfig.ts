import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwUUGb8YsFCht-xWTyZGxfuDdSGbviez4",
  authDomain: "employee-management-ea08a.firebaseapp.com",
  projectId: "employee-management-ea08a",
  storageBucket: "employee-management-ea08a.firebasestorage.app",
  messagingSenderId: "737158485918",
  appId: "1:737158485918:web:061bd07fd5f3df4ef5288f",
  measurementId: "G-66PYJTNKK1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);