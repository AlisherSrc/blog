import { useState } from 'react';
import styles from './createpost.module.css';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Editor from '../../tools/editor';
import { HOST } from '../../globals';
import { validateAndSanitizeInput } from '../../tools/utilities'; // Import the validation functions

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');

    const nav = useNavigate();

    const createNewPost = async (e) => {
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
        if (files && files[0]) { // Ensure there's a file selected
            data.set('file', files[0]);
        }

        try {
            const response = await fetch(`${HOST}/post`, {
                method: 'POST',
                body: data,
                credentials: 'include',
            });
            if (response.ok) {
                nav('/');
            } else {
                const errorText = await response.json();
                console.error('Failed to create post:', errorText.error.message);
                alert(`Something went wrong: ${errorText.error.message}`);
            }
        } catch (err) {
            console.log(err);
            alert('An error occurred while trying to create the post.');
        }
    }

    return (
        <form className={`${styles.form}`} onSubmit={createNewPost}>
            <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type='file' onChange={(e) => setFiles(e.target.files)} />
            <Editor value={content} onChange={newValue => setContent(newValue)} />
            <button type="submit">Create Post</button>
        </form>
    )
}

export default CreatePost;
