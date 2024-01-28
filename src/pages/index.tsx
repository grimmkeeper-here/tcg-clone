import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to '/login' when the component mounts
    router.push('/login'); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return <div>Redirecting...</div>;
};

export default Home;