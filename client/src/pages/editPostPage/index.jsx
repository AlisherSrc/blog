import { useState } from 'react';
import styles from './editpost.module.css';
import { useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Editor from '../../tools/editor';

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content,setContent] = useState('');
    const [files,setFiles] = useState('');
    
    const editPost = (e) => {
        e.preventDefault();

    }

    return (
        <form className={`${styles.form}`} onSubmit={(e) => editPost(e)}>
            <input type='title' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="summary" placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type='file' onChange={(e) => setFiles(e.target.files)}/>
            <Editor value={content} onChange={newValue => setContent(newValue)}/>
            <button>Create post</button>
        </form>
    )
}

export default EditPost;