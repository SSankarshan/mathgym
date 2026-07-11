import {

    collection,

    addDoc,

    getDocs,

    deleteDoc,

    doc

} from "firebase/firestore";

import {

    db

} from "../firebase/firestore.js";

import {

    getCurrentUser

} from "../firebase/auth.js";

export default class StorageManager {

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

            doc => doc.data()

        );

    }

    async saveSession(session) {

        const user =
            getCurrentUser();

        if (!user) {

            return;

        }

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