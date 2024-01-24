import styles from "./post.module.css";

const Post = (props) => {
    const {
        imageUrl,
        title,
        description,
        author,
        time
    } = props;

    return <div className={`${styles.post}`}>
        <div className={`${styles.image_container}`}>
            <img src={imageUrl} alt="post" />
        </div>
        <div className={`${styles.post__texts}`}>
            <h2>{title}</h2>
            <p className={`${styles.info}`}>
                <a href="#" className={`${styles.author}`}>{author}</a>
                <time className={`${styles.description}`}>{time}</time>
            </p>

            <p>{description}</p>
        </div>
    </div>
}

export default Post;