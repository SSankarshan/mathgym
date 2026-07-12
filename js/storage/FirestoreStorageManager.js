import {

    collection,

    addDoc,

    getDocs,

    deleteDoc,

    doc,

    updateDoc

} from "firebase/firestore";

import {

    db

} from "../firebase/firestore.js";

import {

    getCurrentUser

} from "../firebase/auth.js";

export default class FirestoreStorageManager {

    async loadSessions() {

        const user =
            getCurrentUser();

        if (!user) {

            return [];

        }

        const snapshot =
            await getDocs(

                collection(

                    db,

                    "users",

                    user.uid,

                    "sessions"

                )

            );

        return snapshot.docs.map(

            document => document.data()

        );

    }

    async createSession(session) {

        const user =
            getCurrentUser();

        if (!user) {

            return;

        }

        const docRef =
            await addDoc(

                collection(

                    db,

                    "users",

                    user.uid,

                    "sessions"

                ),

                JSON.parse(

                    JSON.stringify(session)

                )

            );

        session.firestoreId =
            docRef.id;

    }

    async updateSession(session) {

        const user =
            getCurrentUser();

        if (!user) {

            return;

        }

        await updateDoc(

            doc(

                db,

                "users",

                user.uid,

                "sessions",

                session.firestoreId

            ),

            JSON.parse(

                JSON.stringify(session)

            )

        );

    }

    async clearHistory() {

        const user =
            getCurrentUser();

        if (!user) {

            return;

        }

        const snapshot =
            await getDocs(

                collection(

                    db,

                    "users",

                    user.uid,

                    "sessions"

                )

            );

        for (

            const session of

            snapshot.docs

        ) {

            await deleteDoc(

                doc(

                    db,

                    "users",

                    user.uid,

                    "sessions",

                    session.id

                )

            );

        }

    }

}