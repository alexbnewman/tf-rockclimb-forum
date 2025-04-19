import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/createPage.css';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await supabase
            .from('posts')
            .insert({ title, content, image_url: imageUrl })
            .select();
        navigate('/');
    };
    
    return (
        <div className="create-post-container">
            <h2 className="create-post-title">Create a New Post</h2>
            
            {/* Link back to the home page */}
            <Link to="/" className="back-to-home">
                ← Back to Home
            </Link>

            <form className='create-post-form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className='create-post-textarea'
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <input
                    className='create-post-input'
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <button className='create-post-button' type="submit">
                    Submit
                </button>
            </form>
      </div>
    );
};

export default CreatePost;