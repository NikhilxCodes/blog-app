import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen } from 'lucide-react';

export default function SignInPage() {
    const [name, setName] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            login(name);
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Interface */}
            <div className="flex items-center justify-center p-8 lg:p-12 bg-gray-50">
                <div className="w-full max-w-md space-y-8">
                    <div className="flex flex-col items-center text-center space-y-2">
                        <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center shadow-lg mb-4">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
                        <p className="text-gray-500">Sign in to publish your own articles and manage your content.</p>
                    </div>

                    <Card className="border-gray-200 shadow-xl bg-white">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-xl">Sign in</CardTitle>
                            <CardDescription>Enter your name to access your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="h-11"
                                    />
                                </div>
                                <Button type="submit" className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white font-medium">
                                    Get Started
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Right Hero Section */}
            <div className="hidden lg:flex flex-col justify-center bg-gray-900 text-white p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 to-black/20" />
                <div className="relative z-10 max-w-xl mx-auto">
                    <blockquote className="space-y-6">
                        <h2 className="text-4xl font-serif leading-tight">
                            "The art of writing is the art of discovering what you believe."
                        </h2>
                        <footer className="text-lg text-gray-400">— Gustave Flaubert</footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}
