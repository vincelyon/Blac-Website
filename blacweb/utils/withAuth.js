// utils/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from './firebaseconfig'; // Check this import statement
import { auth } from './firebaseconfig';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          router.push('/login');
        }
      });

      return () => unsubscribe();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
