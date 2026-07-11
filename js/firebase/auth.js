import {

    getAuth,

    signInWithEmailAndPassword,

    signOut,

    onAuthStateChanged

} from "firebase/auth";

import { app } from "./firebase.js";

const auth =
    getAuth(app);

export async function login(

    email,

    password

) {

    return await signInWithEmailAndPassword(

        auth,

        email,

        password

    );

}

export async function logout() {

    return await signOut(auth);

}

export function getCurrentUser() {

    return auth.currentUser;

}

export function observeAuthState(

    callback

) {

    onAuthStateChanged(

        auth,

        callback

    );

}