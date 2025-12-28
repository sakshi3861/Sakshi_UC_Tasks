import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const ProfilePage = ({ self = false }) => {
  const { username } = useParams();
  const { user: loggedInUser } = useContext(UserContext);

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      let profileUser = null;

      try {
        if (self) {
          profileUser = loggedInUser;
        } else {
          const res = await axios.get(
            `https://task4-authdb.onrender.com/users/${username}`
          );
          profileUser = res.data;
        }

        setUser(profileUser);

        const postsRes = await axios.get(
          `https://task4-authdb.onrender.com/posts/user/${profileUser._id}`
        );
        setPosts(postsRes.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [self, username, loggedInUser]);

  if (loading) return <p className="text-center mt-8">Loading profile...</p>;
  if (!user) return <p className="text-center mt-8 text-red-500">User not found</p>;

  return (
    <div className="min-h-full bg-[linear-gradient(to_right,#91A6FF,#FF88DC)] px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
          <img src={user.avatar || `https://i.pravatar.cc/150?u=${user._id}`} alt={user.username} className="w-24 h-24 rounded-full object-cover border-4 border-purple-500"/>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
            <p className="text-gray-600 mt-1">{user.bio || "No bio available."}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Posts</h3>
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <p className="text-gray-500">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;



