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

import {

    collection,

    addDoc

} from "firebase/firestore";

import {

    doc,

    updateDoc

} from "firebase/firestore";

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

    // async saveSession(session) {

    //     const user =
    //         getCurrentUser();

    //     if (!user) {

    //         return;

    //     }

    //     await addDoc(

    //         collection(

    //             db,

    //             "users",

    //             user.uid,

    //             "sessions"

    //         ),

    //         JSON.parse(

    //             JSON.stringify(session)

    //         )

    //     );

    // }

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