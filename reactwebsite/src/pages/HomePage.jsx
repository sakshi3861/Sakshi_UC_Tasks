import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { UserContext } from "../context/UserContext";
import { getAllUsers } from "../api/auth";

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

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const users = await getAllUsers(); 
        const usersToShow = users.filter(u => u.id !== loggedInUser.id);

        const res = await fetch(`https://picsum.photos/v2/list?page=2&limit=${usersToShow.length}`);
        const picsumData = await res.json();

        const avatarRes = await fetch(`https://randomuser.me/api/?results=${usersToShow.length}&inc=picture`);
        const avatarData = await avatarRes.json();

        const userPosts = usersToShow.map((user, index) => ({
          id: user.id,
          userId: user.id,
          username: user.name,
          userAvatar: avatarData.results[index]?.picture?.medium || `https://i.pravatar.cc/150?u=${user.id}`,
          image: picsumData[index]?.download_url || null, 
          caption: user.bio || `Hello, I am ${user.name}`,
          likes: Math.floor(Math.random() * 50),
          commentsCount: Math.floor(Math.random() * 10),
          isLiked: false,
          isOwnPost: user.id === loggedInUser.id,
        }));

        setPosts(userPosts);
      } catch (err) {
        console.error("Failed to fetch posts or users:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [loggedInUser, navigate]);

  const handleLikeToggle = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
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
              onClick={() => navigate(`/profile/${post.username}`)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
