// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';

const MainAPI = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // Simulate authentication logic
        const { username, password } = req.body;
        if (username === 'user' && password === 'password') {
            // Authentication successful
            res.status(200).json({ message: 'Login successful' });
        } else {
            // Authentication failed
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } else {
        // Handle unsupported HTTP methods
        res.status(405).end();
    }
};
export default MainAPI;