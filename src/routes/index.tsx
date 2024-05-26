import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../contexts/auth';
import { whiteDefault } from '../shared/styleConsts';
import AppRoutes from './app.routes';
import AuthRotes from './auth.routes';

export default function Routes() {
    const { signed, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={whiteDefault} />
            </View>
        );
    }

    return signed ? <AppRoutes />: <AuthRotes />;
}