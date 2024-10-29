import React from 'react';
import { useAuth } from '../contexts/auth';
import AppRoutes from './app.routes';
import AuthRotes from './auth.routes';

export default function Routes() {
    const { signed } = useAuth();
    return signed ? <AppRoutes /> : <AuthRotes />;
    // return <AppRoutes />;
}