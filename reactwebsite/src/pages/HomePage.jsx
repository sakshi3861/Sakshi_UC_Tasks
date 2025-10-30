import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import PostCard from "../components/PostCard";
import postsData from "../data/posts";
import usersData from "../data/users";
import commentsData from "../data/comments";

const HomePage = () => {
  const navigate = useNavigate();

  const userMap = Object.fromEntries(usersData.map((u) => [u.id, u]));
  const commentsMap = commentsData.reduce((acc, comment) => {
    if (!acc[comment.postId]){
      acc[comment.postId] = [];
    }
    acc[comment.postId].push(comment);
    return acc;
  }, {});
  
  const initialPosts = postsData.map((post) => {
  const user = userMap[post.userId];
  return {
    ...post,
    username: user?.username || "Unknown User",
    userAvatar: user?.avatar || "No profile photo",
    caption: post.caption, 
    likes: post.likes || 0,
    commentsCount: post.comments?.length || 0,
    isLiked: false,
  };
  });

  const [posts, setPosts] = useState(initialPosts);

  const handleLikeToggle = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1,}: post
      )
    );
  };

  return (
    <div className="min-h-full bg-[linear-gradient(to_right,#91A6FF,#FF88DC)] px-4 py-8">
      <div className="max-w-xl mx-auto space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={() => handleLikeToggle(post.id)} onClick={() => navigate(`/post/${post.id}`)}/>
        ))}
      </div>
    </div>
  );
};

export default HomePage;






