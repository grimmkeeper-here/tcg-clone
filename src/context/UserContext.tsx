import React, { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, getCookie, removeCookie } from '@/utils/cookieUtils';
import { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem } from '@/utils/localStorageUtils';
import { COOKIES_EXPIRATION_DAY } from '@/config';

interface UserContextProps {
    children: React.ReactNode
}

// Define the context
interface UserContextValues {
    acToken: string | null;
    rfToken: string | null;
    uId: number | null;
    setAcToken: React.Dispatch<React.SetStateAction<string | null>>;
    setRfToken: React.Dispatch<React.SetStateAction<string | null>>;
    setUId: React.Dispatch<React.SetStateAction<number | null>>;
}

const UserContext = createContext<UserContextValues | undefined>(undefined);

// Define user context component
const UserProvider: React.FC<UserContextProps> = ({ children }) => {
    const [acToken, setAcToken] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            const acToken = getCookie('acToken');
            return acToken || null;
        } else {
            return null;
        }
    });

    const [rfToken, setRfToken] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            const rfToken = getCookie('rfToken');
            return rfToken || null;
        } else {
            return null;
        }
    });

    const [uId, setUId] = useState<number | null>(() => {
        if (typeof window !== 'undefined') {
            const uId = getLocalStorageItem<number | null>('uId');
            return uId;
        } else {
            return null;
        }
    });

    useEffect(() => {
        if (acToken !== null) {
            setCookie('acToken', acToken, { expires: COOKIES_EXPIRATION_DAY });
        } else {
            removeCookie('acToken');
        }
    }, [acToken]);

    useEffect(() => {
        if (rfToken !== null) {
            setCookie('rfToken', rfToken, { expires: COOKIES_EXPIRATION_DAY });
        } else {
            removeCookie('rfToken');
        }
    }, [rfToken]);

    useEffect(() => {
        if (uId !== null) {
            setLocalStorageItem<number | null>('uId', uId)
        } else {
            removeLocalStorageItem('uId')
        }
    }, [uId]);

    const contextValue: UserContextValues = {
        uId,
        setUId,
        acToken,
        setAcToken,
        rfToken,
        setRfToken
    }
    return (<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>)
}

// Define user hook
const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
}

export { UserProvider, useUserContext };