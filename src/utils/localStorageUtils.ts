export const setLocalStorageItem = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting localStorage item:', error);
    }
};

export const getLocalStorageItem = <T>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error getting localStorage item:', error);
        return null;
    }
};

export const removeLocalStorageItem = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing localStorage item:', error);
    }
};