import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BlogList } from '@/components/BlogList';
import { BlogDetail } from '@/components/BlogDetail';
import { useBlogs } from '@/hooks/useBlogs';
import { useAuth } from '@/context/AuthContext';
import { PenSquare } from "lucide-react";

export function HomeDashboard() {
    const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
    const [searchParams] = useSearchParams();
    const { data: blogs } = useBlogs();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Handle Deep Linking / Auto-select from URL
    useEffect(() => {
        const blogId = searchParams.get('blogId');
        if (blogId) {
            setSelectedBlogId(blogId);
        }
    }, [searchParams]);

    // Auto-select latest blog
    useEffect(() => {
        if (!selectedBlogId && blogs && blogs.length > 0) {
            const latestBlog = [...blogs].sort((a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )[0];
            if (latestBlog) {
                setSelectedBlogId(String(latestBlog.id));
            }
        }
    }, [selectedBlogId, blogs]);

    const handleCreateClick = () => {
        if (!isAuthenticated) {
            navigate('/signin');
        } else {
            navigate('/create-blog');
        }
    };

    return (
        <main className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Panel - Sidebar */}
                <aside className="lg:col-span-4 space-y-8">
                    {/* Create Blog CTA */}
                    <div className="bg-teal-50 rounded-xl p-6 border border-teal-100/50">
                        <h2 className="text-lg font-bold text-gray-900 mb-2">Share Your Knowledge</h2>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            Contribute to the CA Monk community by writing an insightful article.
                        </p>
                        <Button
                            onClick={handleCreateClick}
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white gap-2 shadow-sm"
                        >
                            <PenSquare className="w-4 h-4" />
                            Write an Article
                        </Button>
                    </div>

                    <div className="border-t border-gray-200" />

                    {/* Blog List Section */}
                    <div className="sticky top-24">
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Latest Articles</h2>
                        <div className="custom-scrollbar overflow-y-auto max-h-[calc(100vh-250px)] pr-2 -mr-2">
                            <BlogList
                                selectedBlogId={selectedBlogId}
                                onSelectBlog={setSelectedBlogId}
                            />
                        </div>
                    </div>
                </aside>

                {/* Right Panel - Blog Detail */}
                <section className="lg:col-span-8 min-h-[500px]">
                    <BlogDetail
                        blogId={selectedBlogId}
                        onDeleteSuccess={() => setSelectedBlogId(null)}
                    />
                </section>
            </div>
        </main>
    );
}
