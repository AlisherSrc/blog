import styles from "./home.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import Post from "../../components/post";

const Home = () => {
    const {userInfo} = useContext(UserContext);
    const [posts,setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post').then((res) => {
            res.json().then((posts) => {
                console.log(posts);
                setPosts(posts);
            })
        })
    },[]);
 

    return (
        <div className={`${styles.posts}`}>
            {(posts.length > 0) ? posts.map((post) => (
                 <Post {...post} />
            )) : <p>Loading...</p>}
        </div>
    )
}

export default Home;