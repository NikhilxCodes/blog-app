import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Author } from '../types/blog';

interface AuthContextType {
    user: Author | null;
    isAuthenticated: boolean;
    login: (name: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Author | null>(null);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('blog_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (name: string) => {
        // Mock login - create a user based on name
        // Generate a simple consistent hash or random ID for the session
        const mockUser: Author = {
            id: btoa(name + Date.now()).slice(0, 8), // Simple unique ID
            name: name,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D9488&color=fff`
        };

        setUser(mockUser);
        localStorage.setItem('blog_user', JSON.stringify(mockUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('blog_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
