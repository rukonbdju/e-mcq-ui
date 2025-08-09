'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { authSelector } from '@/features/auth/authSlice';
import { getLoggedInUser } from '@/features/auth/authThunks';
import Loading from './loading';

const AuthWrapper = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isAuthenticated, isLoading } = useSelector(authSelector);

    // Fetch logged-in user on mount
    useEffect(() => {
        dispatch(getLoggedInUser());
    }, [dispatch]);

    // Redirect if authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    // Show loading overlay if fetching auth state
    if (isLoading) {
        return <Loading />;
    }

    return children;
};

export default AuthWrapper;
