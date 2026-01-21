import { CreateBlogForm } from '@/components/CreateBlogForm';

import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import type { Blog } from '@/types/blog';

export default function CreateBlogPage() {
    const navigate = useNavigate();

    const handleCreateSuccess = (newBlog: Blog) => {
        // Redirect to home and select the new blog via query param
        if (newBlog.id) {
            navigate(`/?blogId=${newBlog.id}`);
        } else {
            navigate('/'); // Fallback if no ID
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="max-w-2xl mx-auto px-6">
                <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-teal-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Article</h1>
                    <p className="text-gray-500">Share your financial expertise with the community.</p>
                </div>

                <CreateBlogForm onSuccess={handleCreateSuccess} />
            </div>
        </div>
    );
}
