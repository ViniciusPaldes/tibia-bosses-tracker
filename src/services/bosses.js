import { isToday } from "./date";

export const isKilled = (boss) => {
    // Check if "checks" property exists and it is an array
    if (boss && boss.checks && Array.isArray(boss.checks)) {
        // Check if any of the checks match the current date and have "killed" set to true
        return boss.checks.some((check) => {
            if (check.killed) {
                // Convert the timestamp to a Date object
                const checkDate = new Date(check.timestamp?.seconds * 1000 + check.timestamp?.nanoseconds / 1000000);

                // Check if the check date matches the current date (ignoring the time)
                return isToday(checkDate);
            }
            return false;
        });
    }

    // Return false if checks are not defined or not an array
    return false;
};