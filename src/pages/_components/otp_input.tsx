// components/AuthForm.tsx
import React, { useState } from 'react';

interface OtpInputProps {
    companyOptions: { value: string; label: string }[];
    onSubmit: (companyID: string, phoneNumber: string, otp: string) => void;
}

const OtpInputComponent: React.FC<OtpInputProps> = ({ companyOptions, onSubmit }) => {
    const [companyID, setCompanyID] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [otp, setOtp] = useState<string>('');

    const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCompanyID(event.target.value);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };

    const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(companyID, phoneNumber, otp);
    };

    return (
        <form className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md">
            <div className="mb-6">
                <label htmlFor="companyID" className="block text-sm font-medium text-gray-700">
                    Company ID
                </label>
                <select
                    id="companyID"
                    name="companyID"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-500"
                    value={companyID}
                    onChange={handleCompanyChange}
                >
                    <option value="" disabled>
                        Select Company ID
                    </option>
                    {companyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-6">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-500"
                    onChange={handlePhoneChange}
                />
            </div>
            <div className="mb-6">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    OTP Code
                </label>
                <input
                    type="text"
                    id="otp"
                    name="otp"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-500"
                    onChange={handleOtpChange}
                />
            </div>
            <button
                type="submit"
                className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </form>
    );
};

export default OtpInputComponent;
