import { signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import { auth, provider } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/appSlice';
import ClipLoader from 'react-spinners/ClipLoader';

function Login() {
    const dispatch = useDispatch();
    const { user, loading } = useSelector(store => store.appSlice);
    const [initializing, setInitializing] = useState(true);
    const [showLoader, setShowLoader] = useState(true);

    const signInWithGoogle = async () => {
        try {
            dispatch(setLoading(true));
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            dispatch(setUser({
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
            }));
            localStorage.setItem("userLoggedIn", JSON.stringify({
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
            }));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            try {
                const localUser = localStorage.getItem("userLoggedIn");
                if (localUser) {
                    const loggedUser = JSON.parse(localUser);
                    dispatch(setUser({
                        displayName: loggedUser.displayName,
                        email: loggedUser.email,
                        photoURL: loggedUser.photoURL
                    }));
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoading(false));
                setInitializing(false);
            }
        };

        checkUser();
        setShowLoader(false);

    }, [dispatch]);

    const shouldShowLoader = initializing || loading || showLoader;

    console.log('initializing:', initializing);
    console.log('loading:', loading);
    console.log('showLoader:', showLoader);

    return (
        <div className='w-dvh h-dvh flex justify-center items-center bg-gray-200'>
            {shouldShowLoader ? (
                <div className='flex items-center justify-center h-96 w-screen '>
                    <h1>Loading...</h1>
                    <ClipLoader size={50} aria-label="Loading Spinner" data-testid="loader" />
                </div>
            ) : (
                !user && (
                    <div className='p-8 bg-white flex flex-col gap-3 rounded-md'>
                        <h1 className='text-center text-xl font-medium mb-5'>LOGIN</h1>
                        <GoogleButton onClick={signInWithGoogle} />
                    </div>
                )
            )}
        </div>
    );
}

export default Login;
