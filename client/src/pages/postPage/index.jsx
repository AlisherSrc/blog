import { useEffect, useState } from 'react';
import styles from './post.module.css';
import { useParams } from 'react-router-dom';
import { isValid, parseISO, format } from 'date-fns';
import { formatDate } from '../../tools';

const Post = () => {
    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then((resp) => {
            resp.json().then((post) => {
                setPostInfo(post);
            });
        })
    }, []);

    return (<>
        {
            postInfo
                ?
                <div className={`${styles.post_page}`}>
                    <h1>{postInfo.title}</h1>
                    <time>{formatDate(postInfo.createdAt)}</time>
                    <div className={`${styles.author}`}>by @{postInfo.author?.username}</div>
                    <div className={`${styles.image_container}`}>
                        <img src={`http://localhost:4000/${postInfo.cover}`} />
                    </div>
                    <div className={`${styles.content}`} dangerouslySetInnerHTML={{ __html: postInfo.content }} />
                </div>
                :
                <p>Loading...</p>
        }
    </>
    )
}

export default Post;
