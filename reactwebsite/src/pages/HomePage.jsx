import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const HomePage = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    const fetchMockPosts = async () => {
      setLoading(true);

      try {
        const res = await axios.get("https://picsum.photos/v2/list?page=2&limit=5");

        const mockPosts = res.data.map((img, index) => ({
          id: index + 1,
          userId: loggedInUser.id + index,
          username: `User${index + 1}`,
          userAvatar: `https://i.pravatar.cc/150?img=${index + 10}`,
          image: img.download_url,
          caption: `This is a post by User${index + 1}`,
          likes: Math.floor(Math.random() * 50),
          commentsCount: Math.floor(Math.random() * 10),
          isLiked: false,
          isOwnPost: index === 0 
        }));

        setPosts(mockPosts);
      } catch (err) {
        console.error("Failed to fetch mock posts:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMockPosts();
  }, [loggedInUser, navigate]);

  const handleLikeToggle = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  if (loading) return <p className="text-center mt-8">Loading posts...</p>;

  return (
    <div className="min-h-full bg-[linear-gradient(to_right,#91A6FF,#FF88DC)] px-4 py-8">
      <div className="max-w-xl mx-auto space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts available.</p>
        ) : (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLikeToggle(post.id)}
              onClick={() => navigate(`/post/${post.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;










