export default class LocalStorageStorageManager {

    constructor() {

        this.storageKey = "math-gym-history";

    }

    loadSessions() {

        const json =
            localStorage.getItem(

                this.storageKey

            );

        return json

            ? JSON.parse(json)

            : [];

    }

    async createSession(session) {

        const sessions =
            this.loadSessions();

        sessions.push(session);

        session.firestoreId =
            sessions.length - 1;

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(sessions)

        );

    }

    async updateSession(session) {

        const sessions =
            this.loadSessions();

        sessions[session.firestoreId] =
            session;

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(sessions)

        );

    }

    async clearHistory() {

        localStorage.removeItem(

            this.storageKey

        );

    }

}