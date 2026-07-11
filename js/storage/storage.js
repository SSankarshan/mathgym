const KEY = "mental-math-history";

export function loadSessions() {

    return JSON.parse(

        localStorage.getItem(KEY) || "[]"

    );

}

export function saveSession(session) {

    const sessions = loadSessions();

    sessions.push(session);

    localStorage.setItem(

        KEY,

        JSON.stringify(sessions)

    );

}