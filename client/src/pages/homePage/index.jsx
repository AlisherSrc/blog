import styles from "./home.module.css";
import { useEffect, useState } from "react";
import Post from "../../components/post";
import { HOST } from "../../globals";

const Home = () => {
    const [posts,setPosts] = useState(null);

    useEffect(() => {
        fetch(`${HOST}/post`).then((res) => {
            res.json().then((posts) => {
                console.log(posts);
                setPosts(posts);
            })
        })
    },[]);
 

    return (
        <div className={`${styles.posts}`}>
            {(posts) ? 
            (posts.length <= 0 ? <p>Sorry, there are no posts yet, stay tuned!</p>  : posts.map((post) => (
                 <Post {...post} />
            )
            )) : <p>Loading...</p>}

        </div>
    )
}

export default Home;