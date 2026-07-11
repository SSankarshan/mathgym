export default class StorageManager {

    constructor() {

        this.storageKey = "mental-math-history";

    }

    loadSessions() {

        const sessionJson =
            localStorage.getItem(this.storageKey);

        if (!sessionJson) {
            return [];
        }

        return JSON.parse(sessionJson);

    }

    saveSession(session) {

        const sessionList = this.loadSessions();

        sessionList.push(session);

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(sessionList)

        );

    }

    clearHistory() {

        localStorage.removeItem(this.storageKey);

    }

}