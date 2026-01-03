import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { fetchMe } from "../api/auth";
import allposts from "../data/posts";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [clickedPost, setClickedPost] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchMe();
      setUser(data);
    };
    getUser();

    setPosts(allposts); 
  }, []);

  if (!user) return null;

  return (
    <div className="transition">

      <div className="profile max-w-3xl mx-auto px-4 py-6">
        <div className="p1 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
          <img src={user.avatar || "/assets/user2.jpeg"} className="w-24 h-24 rounded-full object-cover border-4 border-purple-500" alt={user.name}/>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">@{user.name}</h2>
            <p className="text-sm text-gray-600">{user.bio || "No bio available."}</p>
            <div className="flex space-x-4 mt-2">
              <button className="edit fp">895 followers</button>
              <button className="edit fp">568 following</button>
              <button className="edit fp">{posts.length} posts</button>
            </div>
            <button className="edit mt-2">Edit Profile</button>
          </div>
        </div>

        <hr className="line profline mb-6" />

        {clickedPost && (
          <div className="mb-6">
            <PostCard
              post={{
                ...clickedPost,
                username: user.name,
                userAvatar: user.avatar || "/assets/user2.jpeg",
              }}
              onClick={() => setClickedPost(null)} 
              onLike={() => {
                setPosts(prev =>
                  prev.map(p =>
                    p.id === clickedPost.id
                      ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
                      : p
                  )
                );
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {posts.map((post) => (
            <img key={post.id} src={post.image} alt={`Post ${post.id}`} className="profposts w-full h-32 object-cover cursor-pointer rounded-md" onClick={() => setClickedPost(post)}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


