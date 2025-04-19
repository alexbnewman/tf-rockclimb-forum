import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/homePage.css';

const HomeFeed = () => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('created_at');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchPosts();
    }, [sortBy, search]);


    const fetchPosts = async () => {
        let query = supabase
            .from('posts')
            .select('id, title, created_at, upvotes')
            .order(sortBy, { ascending: false });

        if (search) {
            query = query.ilike('title', `%${search}%`);
        }

        const { data } = await query;
        setPosts(data || []);
    };

    return (
        <div className="home-feed">
            {/* Header with "Rock-Climbing" */}
            <header className="home-header">
            <h1>Rock-Climbing Forum</h1>
            </header>
            <div className="search-bar">
                <input
                className="search-input"
                type="text"
                placeholder="Search posts by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <select className="sort-select" onChange={(e) => setSortBy(e.target.value)}>
                    <option value="created_at">Sort by Created Time</option>
                    <option value="upvotes">Sort by Upvotes</option>
                </select>
                <Link to="/create-post">
                    <button className="create-post-button">Create New Post</button>
                </Link>
            </div>

            <div className="posts-list">
                {posts.map((post) => (
                    <div key={post.id} className='post-item'>
                        <Link to={`/post/${post.id}`} className="post-link">
                            <h3 className="post-title">{post.title}</h3>
                            <div className="post-meta">
                                <p className="post-date">{new Date(post.created_at).toLocaleString()}</p>
                                <p className="post-upvotes">Upvotes: {post.upvotes}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeFeed;