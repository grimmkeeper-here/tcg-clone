import React, { useState } from 'react';
import { useRouter } from 'next/router';


const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();


    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Send a POST request to the /login API endpoint
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Authentication successful, redirect or perform other actions
                console.log('Login successful!');
                // Redirect to the main page
                router.push('/main');

            } else {
                // Authentication failed, handle error
                const data = await response.json();
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
            setError('An error occurred');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            <div className="bg-gray-200 p-8 rounded-md shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full p-2 border rounded-md"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-2 border rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700"
                        type='submit'
                    // onClick={handleLogin}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;