import ReactQuill from 'react-quill';


const Editor = (props) => {
    const {
        value,
        onChange
    } = props;

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
    
        
    return (
        <ReactQuill value={value} modules={modules} formats={formats} onChange={onChange}/>
    )
}

export default Editor;