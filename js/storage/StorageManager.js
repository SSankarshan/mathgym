import FirestoreStorageManager from "./FirestoreStorageManager.js";

import LocalStorageStorageManager from "./LocalStorageStorageManager.js";

export default class StorageManager {

    constructor(isGuest) {

        if (isGuest) {

            this.impl =
                new LocalStorageStorageManager();

        }

        else {

            this.impl =
                new FirestoreStorageManager();

        }

    }

    loadSessions() {

        return this.impl.loadSessions();

    }

    createSession(session) {

        return this.impl.createSession(session);

    }

    updateSession(session) {

        return this.impl.updateSession(session);

    }

    clearHistory() {

        return this.impl.clearHistory();

    }

}