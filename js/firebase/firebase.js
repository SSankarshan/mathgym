import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCM2mB8rTLHBIj_E8FyX81ddnlkcO2B9xM",
    authDomain: "mathgym-1.firebaseapp.com",
    projectId: "mathgym-1",
    storageBucket: "mathgym-1.firebasestorage.app",
    messagingSenderId: "634090875446",
    appId: "1:634090875446:web:b405b8f0fa88c742e34697"
};

export const app =
    initializeApp(firebaseConfig);