import styles from "./post.module.css";
import { Link } from "react-router-dom";
import { formatDate } from "../../tools/formatDate";
import { HOST } from "../../globals";


const Post = (props) => {
    const {
        _id,
        cover,
        title,
        description,
        author,
        createdAt
    } = props;


    return <div className={`${styles.post}`}>
        <div className={`${styles.image_container}`}>
            <Link to={`/post/${_id}`}>
                <img src={`${HOST}/${cover}`} alt="post" />
            </Link>
        </div>
        <div className={`${styles.post__texts}`}>
            <Link to={`/post/${_id}`}>
                <h2>{title}</h2>
            </Link>
            <p className={`${styles.info}`}>
                <a className={`${styles.author}`}>{author?.username}</a>
                <time className={`${styles.description}`}>{formatDate(createdAt)}</time>
            </p>

            <p>{description}</p>
        </div>
    </div>
}

export default Post;