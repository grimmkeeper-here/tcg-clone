// components/Login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import loginService from '@/services/loginService';

const LoginComponent: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Username:', username);
        console.log('Password:', password);
        const isAuthenticated = await loginService(username, password);
        if (isAuthenticated) {
            router.push('/otp/send');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-gray-700">Login</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full border rounded-md p-2 text-gray-500"
                        placeholder="Enter your username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="w-full border rounded-md p-2 pr-10 text-gray-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button
                            type="button"
                            className="absolute top-2 right-2 cursor-pointer text-gray-500"
                            onClick={handleTogglePassword}
                        >
                            {showPassword ? (
                                <i className="fas fa-eye-slash"></i>
                            ) : (
                                <i className="fas fa-eye"></i>
                            )}
                        </button>
                    </div>
                </div>
                <button type="submit" className="bg-orange-500 text-white rounded-md p-2 w-full">
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LoginComponent;