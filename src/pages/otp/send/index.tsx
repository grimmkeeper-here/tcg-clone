// pages/index.tsx
import React from 'react';
import OtpInputComponent from '@/pages/_components/otp_input';
import { getCookie } from '@/utils/cookieUtils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AUTH_API_URL } from "@/config";

// var companyOptions = [
//     { value: 'company1', label: 'Company 1' },
//     { value: 'company2', label: 'Company 2' },
//     { value: 'company3', label: 'Company 3' },
// ];
interface Option {
    value: any;
    label: string;
}

const Home: React.FC = () => {
    const [companyOptions, setcompanyOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const acToken = getCookie('acToken');
    if (!acToken || acToken.length === 0) {
        useEffect(() => {
            router.push("/login")
        }, []);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${AUTH_API_URL}/backend/auth/v1/user/companies`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + acToken,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                    var tmpArr = []
                    for (const item of data.data.items) {
                        tmpArr.push({ value: item.cid, label: item.domain })
                    };
                    setcompanyOptions(tmpArr)
                    // setData(result);
                } else {
                    router.push("/login");
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                router.push("/login");
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = (companyID: string, phoneNumber: string, otp: string) => {
        const fetchData = async () => {
            try {
                // Make API call using formData
                const response = await fetch('https://devapi.stacktech.org/backend/msg-channel/v1/send-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "phone_number": phoneNumber,
                        "otp": otp,
                        "cid": companyID,
                        "template_code": "default_template"
                    }),
                });

                if (response.ok) {
                    // Handle successful response
                    const result = await response.json();
                    console.log('API response:', result);
                    alert('Send success');
                } else {
                    // Handle error response
                    console.error('Failed to call API');
                }
            } catch (error) {
                console.error('Error calling API:', error);
            }
        };

        fetchData();
    };

    return (
        <div>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <OtpInputComponent companyOptions={companyOptions} onSubmit={handleSubmit} />
                </div>
            )}
        </div>
    );
};

export default Home;
