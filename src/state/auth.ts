import {create} from 'zustand'

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    user: {
        id: string;
        email: string;
        name: string;
    } | null;
    login: (
        data: {
            accessToken: string; 
            refreshToken: string; 
            user: {
                id: string; 
                email: string; 
                name: string;
            };
        }) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    // Initialize from localStorage if available
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    // ...functions will go here..
    login: (data) => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        set({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            user: data.user,
        });
    },
    logout: ()=> {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        set({
            accessToken: null,
            refreshToken: null,
            user: null,
        });
    },
}));