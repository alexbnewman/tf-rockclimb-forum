import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../styles/postPage.css';

const PostPage = () => {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [id]);

    const fetchPost = async () => {
        const { data } = await supabase
            .from('posts')
            .select()
            .eq('id', id)
            .single();
        setPost(data);
        if (data) {
            setNewTitle(data.title); // Set initial values to the current post data
            setNewContent(data.content);
            setNewImageUrl(data.image_url); // Initialize with the current image URL
        }
    };

    const fetchComments = async () => {
        const { data } = await supabase
            .from('comments')
            .select()
            .eq('post_id', id);
        setComments(data || []);
    };

    const handleUpvote = async () => {
        await supabase
            .from('posts')
            .update({ upvotes: post.upvotes + 1 })
            .eq('id', id);
        fetchPost();
    };

    const handleDelete = async () => {
        await supabase
            .from('posts')
            .delete()
            .eq('id', id);
        navigate('/');
    }

    const handleAddComment = async () => {
        if (comment.trim() === '') return; // Don't submit empty comments

        await supabase
            .from('comments')
            .insert([{ content: comment, post_id: id, created_at: new Date() }]);

        setComment(''); // Clears input field after submission
        fetchComments(); // Refresh comments (refetch from Supabase)
    }

    const handleUpdatePost = async () => {
        if (newTitle.trim() === '' || newContent.trim() === '') { // Don't submit empty fields
            alert('Please fill in both title and content.');
            return;
        }

        await supabase
            .from('posts')
            .update({ title: newTitle, content: newContent, image_url: newImageUrl })
            .eq('id', id);

        setIsEditing(false); // Exit edit mode
        fetchPost(); // Refresh post data
    };

    return (
        <div className="post-page">
            <button className="back-to-home-button" onClick={() => navigate('/')}>
                Back to Home
            </button>
            {post && (
                <>
                    <h2 className="post-title">
                        {isEditing ? (
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="edit-title-input"
                        />
                        ) : (
                        post.title
                        )}
                    </h2>

                    <img className="post-image" src={post.imageUrl} alt={post.title} />

                    {isEditing && (
                        <div>
                        <label htmlFor="image-url">New Image URL:</label>
                        <input
                            type="text"
                            id="image-url"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            placeholder="Enter new image URL"
                            className="image-url-input"
                        />
                        </div>
                    )}

                    <p className="post-content">
                        {isEditing ? (
                        <textarea
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            className="edit-content-textarea"
                        />
                        ) : (
                        post.content
                        )}
                    </p>

                    <button className="upvote-button" onClick={handleUpvote}>
                        Upvote {post.upvotes}
                    </button>
                    <button className="delete-button" onClick={handleDelete}>
                        Delete Post
                    </button>

                    {isEditing ? (
                        <button className="save-button" onClick={handleUpdatePost}>
                        Save Changes
                        </button>
                    ) : (
                        <button className="edit-button" onClick={() => setIsEditing(true)}>
                        Edit Post
                        </button>
                    )}

                    <div className="comments-section">
                        <h3 className="comments-title">Comments</h3>
                        <div className="comments-list">
                        {comments.map((comment) => (
                            <div key={comment.id} className="comment">
                            <p>{comment.content}</p>
                            </div>
                        ))}
                    </div>

                    <textarea
                        className="comment-input"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment"
                    />
                    <button className="submit-comment-button" onClick={handleAddComment}>
                        Submit Comment
                    </button>
                </div>
            </>
         )}
        </div>
    );
};

export default PostPage;