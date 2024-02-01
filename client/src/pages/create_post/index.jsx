import { useState } from 'react';
import styles from './createpost.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],        // toggled buttons
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
    ]
}

const formats = ['background', 'bold', 'color', 'font', 'code', 'italic', 'link', 'size', 'strike',
    'script', 'underline', 'blockquote', 'header', 'indent', 'list', 'align', 'direction', 'code-block', 'image', 'video']


const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content,setContent] = useState('');
    const [files,setFiles] = useState('');
    
    const nav = useNavigate();

    const createNewPost = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.set('title',title);
        data.set('description',description);
        data.set('content',content);
        data.set('file',files[0]);

        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });

        if(response.ok){
            nav('/')
        }else{
            alert("Something went wrong");
        }
    }

    return (
        <form className={`${styles.form}`} onSubmit={(e) => createNewPost(e)}>
            <input type='title' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="summary" placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type='file' onChange={(e) => setFiles(e.target.files)}/>
            <ReactQuill value={content} modules={modules} formats={formats} onChange={newValue => setContent(newValue)}/>
            <button>Create post</button>
        </form>
    )
}

export default CreatePost;