import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainPage.css";

const MainPage = () => {
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get("http://localhost:5000/posts")
      .then(res => setPosts(res.data));
  };

  const createPost = async () => {
    await axios.post("http://localhost:5000/post",
      { content },
      { headers: { Authorization: token } }
    );
    setContent("");
    fetchPosts();
  };

  const likePost = async (id) => {
    await axios.put(`http://localhost:5000/like/${id}`,
      {},
      { headers: { Authorization: token } }
    );
    fetchPosts();
  };

  const addComment = async (id) => {
    await axios.post(`http://localhost:5000/comment/${id}`,
      { text: commentText[id] },
      { headers: { Authorization: token } }
    );
    setCommentText({ ...commentText, [id]: "" });
    fetchPosts();
  };

  return (
    <div className="container">
      <h2>Social Media Feed</h2>

      <input
        type="text"
        placeholder="Enter JWT Token after login"
        onChange={(e) => setToken(e.target.value)}
      />

      <div className="post-box">
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={createPost}>Post</button>
      </div>

      {posts.map(post => (
        <div key={post._id} className="card">
          <p>{post.content}</p>
          <button onClick={() => likePost(post._id)}>
            Like ({post.likes})
          </button>

          <div className="comments">
            {post.comments.map((c, i) => (
              <p key={i}>💬 {c.text}</p>
            ))}
          </div>

          <input
            type="text"
            placeholder="Add comment"
            value={commentText[post._id] || ""}
            onChange={(e) =>
              setCommentText({ ...commentText, [post._id]: e.target.value })
            }
          />
          <button onClick={() => addComment(post._id)}>
            Comment
          </button>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
