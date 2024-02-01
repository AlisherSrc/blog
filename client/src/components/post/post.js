import styles from "./post.module.css";
import { formatISO9075, isValid, parseISO, format} from 'date-fns';

const Post = (props) => {
    const {
        cover,
        title,
        description,
        content,
        author,
        createdAt
    } = props;

    const formatDate = (dateString) => {
        const date = parseISO(dateString);

        return isValid(date) ? format(new Date(dateString), 'd-MM-yyyy') : 'Invalid Date';
    }


    return <div className={`${styles.post}`}>
        <div className={`${styles.image_container}`}>
            <img src={`http://localhost:4000/${cover}`} alt="post" />
        </div>
        <div className={`${styles.post__texts}`}>
            <h2>{title}</h2>
            <p className={`${styles.info}`}>
                <a href="#" className={`${styles.author}`}>{author?.username}</a>
                <time className={`${styles.description}`}>{formatDate(createdAt)}</time>
            </p>

            <p>{description}</p>
        </div>
    </div>
}

export default Post;