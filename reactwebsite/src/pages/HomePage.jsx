// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import PostCard from "../components/PostCard";
// import { UserContext } from "../context/UserContext";
// import axios from "axios";

// const HomePage = () => {
//   const { user: loggedInUser } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!loggedInUser) {
//       navigate("/login");
//       return;
//     }

//     const fetchMockPosts = async () => {
//       setLoading(true);

//       try {
//         const res = await axios.get("https://picsum.photos/v2/list?page=2&limit=5");

//         const mockPosts = res.data.map((img, index) => ({
//           id: index + 1,
//           userId: loggedInUser.id + index,
//           username: `User${index + 1}`,
//           userAvatar: `https://i.pravatar.cc/150?img=${index + 10}`,
//           image: img.download_url,
//           caption: `This is a post by User${index + 1}`,
//           likes: Math.floor(Math.random() * 50),
//           commentsCount: Math.floor(Math.random() * 10),
//           isLiked: false,
//           isOwnPost: index === 0 
//         }));

//         setPosts(mockPosts);
//       } catch (err) {
//         console.error("Failed to fetch mock posts:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMockPosts();
//   }, [loggedInUser, navigate]);

//   const handleLikeToggle = (postId) => {
//     setPosts(prevPosts =>
//       prevPosts.map(post =>
//         post.id === postId
//           ? {
//               ...post,
//               isLiked: !post.isLiked,
//               likes: post.isLiked ? post.likes - 1 : post.likes + 1
//             }
//           : post
//       )
//     );
//   };

//   if (loading) return <p className="text-center mt-8">Loading posts...</p>;

//   return (
//     <div className="min-h-full bg-[linear-gradient(to_right,#91A6FF,#FF88DC)] px-4 py-8">
//       <div className="max-w-xl mx-auto space-y-6">
//         {posts.length === 0 ? (
//           <p className="text-center text-gray-600">No posts available.</p>
//         ) : (
//           posts.map(post => (
//             <PostCard
//               key={post.id}
//               post={post}
//               onLike={() => handleLikeToggle(post.id)}
//               onClick={() => navigate(`/post/${post.id}`)}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { UserContext } from "../context/UserContext";
import { getAllUsers, getMe } from "../api/auth"; // ✅ use your API functions

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
        const users = await getAllUsers(); // fetch all registered users

        // Convert users to "posts"
        const userPosts = users.map((user, index) => ({
          id: user.id || index + 1,
          userId: user.id,
          username: user.name, // use registered username
          userAvatar: user.avatar || `https://i.pravatar.cc/150?img=${index + 10}`,
          image: user.postImage || null, // optional if you store post images
          caption: user.bio || `Hello, I am ${user.name}`,
          likes: Math.floor(Math.random() * 50),
          commentsCount: Math.floor(Math.random() * 10),
          isLiked: false,
          isOwnPost: user.id === loggedInUser.id,
        }));

        setPosts(userPosts);
      } catch (err) {
        console.error("Failed to fetch posts or users:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [loggedInUser, navigate]);

  const handleLikeToggle = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
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
          posts.map((post) => (
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


