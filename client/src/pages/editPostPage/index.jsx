import { useEffect, useState } from 'react';
import styles from './editpost.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import Editor from '../../tools/editor';
import { HOST } from '../../globals';
import { validateAndSanitizeInput } from '../../tools/utilities'; // Import the validation function

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        fetch(`${HOST}/post/${id}`).then((res) => {
            res.json().then((post) => {
                setTitle(post.title);
                setDescription(post.description);
                setContent(post.content);
            })
        })
    }, []);

    const editPost = async (e) => {
        e.preventDefault();
    
        const validatedTitle = validateAndSanitizeInput(title);
        const validatedDescription = validateAndSanitizeInput(description);
        const validatedContent = validateAndSanitizeInput(content);
    
        if (!validatedTitle || !validatedDescription || !validatedContent) {
            alert('Invalid input detected. Please correct your input and try again.');
            return;
        }
    
        const data = new FormData();
        data.set('title', validatedTitle);
        data.set('description', validatedDescription);
        data.set('content', validatedContent);
        data.set('id', id);
        if (files && files[0]) {
            data.set('file', files[0]);
        }
    
        try {
            const response = await fetch(`${HOST}/post/${id}`, {
                method: "PUT",
                body: data,
                credentials: 'include'
            });
    
            if (!response.ok) {
                const errorText = await response.json();
                alert(`${errorText.message}`);
                throw new Error(`HTTP status ${response.status}`);
            }
    
            alert("Edited!");
            nav(`/post/${id}`);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    

    const deletePost = async (e) => {
        e.preventDefault();

        const confirmBox = window.confirm("Do you really want to delete this post?");
        if (confirmBox) {
            await fetch(`${HOST}/post/${id}`, {
                method: "DELETE",
                credentials: 'include'
            });
            nav('/');
        }
    }

    return (
        <div className={`${styles.content}`}>
            <form className={`${styles.form}`} onSubmit={editPost}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="file" onChange={(e) => setFiles(e.target.files)} />
                <Editor value={content} onChange={newValue => setContent(newValue)} />
                <button type="submit">Update Post</button>
            </form>
            <button className={`${styles.delete_btn}`} onClick={deletePost}>
                <p>Delete Post<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg></p>
            </button>
        </div>
    )
}

export default EditPost;
