import axios from "axios";

const getData = async (userId) => {
    const {data: users} = await axios("https://jsonplaceholder.typicode.com/users/" + userId);
    const {data: posts} = await axios("https://jsonplaceholder.typicode.com/posts?userId=" + userId);


    // Post data arrray, user obj. olduğu için obje içine aldım.
    let data = {
        "user":users, 
        "posts": posts
    };

    return data;
}

export default getData;