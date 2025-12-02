import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJ8ed75fsbTEvJU4jpWFmpHjy2n_fNQ4M",
  authDomain: "met-mythic-e3aae.firebaseapp.com",
  projectId: "met-mythic-e3aae",
  storageBucket: "met-mythic-e3aae.firebasestorage.app",
  messagingSenderId: "941410621956",
  appId: "1:941410621956:web:1fc4fc08b03a1df214b351"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);