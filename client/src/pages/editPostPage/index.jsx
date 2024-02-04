import { useEffect, useState } from 'react';
import styles from './editpost.module.css';
import { useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Editor from '../../tools/editor';

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then((res) => {
            res.json().then((post) => {
                setTitle(post.title);
                setDescription(post.description);
                setContent(post.content);

            })
        })
    }, []);

    const editPost = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.set('title', title);
        data.set('description', description);
        data.set('content', content);
        data.set('id',id);
        files?.[0] && data.set('file', files?.[0]);

        await fetch('http://localhost:4000/post/${id}', {
            method: "PUT",
            body: data,
            credentials: 'include'
        })

        nav(`/post/${id}`);
    }

    return (
        <form className={`${styles.form}`} onSubmit={(e) => editPost(e)}>
            <input type='title' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="summary" placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type='file' onChange={(e) => setFiles(e.target.files)} />
            <Editor value={content} onChange={newValue => setContent(newValue)} />
            <button>Update post</button>
        </form>
    )
}

export default EditPost;