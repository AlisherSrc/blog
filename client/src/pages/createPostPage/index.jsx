import { useState } from 'react';
import styles from './createpost.module.css';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Editor from '../../tools/editor';
import { HOST } from '../../globals';


const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');

    const nav = useNavigate();

    const createNewPost = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.set('title', title);
        data.set('description', description);
        data.set('content', content);
        data.set('file', files[0]);

        const response = await fetch(`${HOST}/post`, {
            method: 'POST',
            body: data,
            credentials: 'include',
        });

        if (response.ok) {
            nav('/');
        } else {
            const errorText = await response.text(); // or response.json() if the server responds with JSON
            console.error('Failed to create post:', errorText);
            alert(`Something went wrong: ${errorText}`);
        }
    }

    return (
        <form className={`${styles.form}`} onSubmit={(e) => createNewPost(e)}>
            <input type='title' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="summary" placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type='file' onChange={(e) => setFiles(e.target.files)} />
            <Editor value={content} onChange={newValue => setContent(newValue)} />
            <button>Create post</button>
        </form>
    )
}

export default CreatePost;