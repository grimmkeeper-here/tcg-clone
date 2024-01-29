import { AUTH_API_URL } from "@/config";
import { setCookie } from '@/utils/cookieUtils';
import { COOKIES_EXPIRATION_DAY } from '@/config';
import { setLocalStorageItem } from "@/utils/localStorageUtils";

const loginService = async (username: string, password: string): Promise<boolean> => {
    try {
        const res = await fetch(`${AUTH_API_URL}/backend/auth/v1/user/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'account': username,
                'password': password
            }),
        });
        if (!res.ok) {
            console.error('Authentication failed');
            return false;
        }
        const data = await res.json();
        const code = data.code;
        if (code !== 0) {
            console.error('Authentication failed: ', data.message);
            return false;
        }
        console.log('Authentication successful', data.data);

        setCookie('acToken', data.data.ac_token, { expires: COOKIES_EXPIRATION_DAY });
        setCookie('rfToken', data.data.rf_token, { expires: COOKIES_EXPIRATION_DAY });
        setLocalStorageItem<number | null>('uId', data.data.uid)

        return true;

    } catch (err) {
        console.error('Error during authentication: ', err);
        return false;
    }
};

export default loginService
