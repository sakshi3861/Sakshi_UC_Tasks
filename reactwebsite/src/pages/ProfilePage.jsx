import React, {useState,useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";
import PostCard from "../components/PostCard";
import usersData from "../data/users"; 
import postsData from "../data/posts"; 

const ProfilePage = () => {
  const {username} = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const foundUser = usersData.find((u) => u.username === username);
    if (!foundUser) {
      navigate("/not-found"); 
      return;
    }
    setUser(foundUser);

    const postsForUser = postsData
      .filter((post) => post.userId === foundUser.id)
      .sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ); 
    setUserPosts(postsForUser);
  }, [username, navigate]);

  if (!user) return null; 

  return (
    <div className="min-h-full bg-[linear-gradient(to_right,#91A6FF,#FF88DC)] px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8">
          <img src={user.avatar} alt={user.username} className="w-24 h-24 rounded-full object-cover border-4 border-purple-500"/>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>

          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
          My Posts
        </h3>

        <div className="space-y-6">
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <PostCard key={post.id} post={{ ...post, username: user.username, userAvatar: user.avatar,}}/>
            ))
          ) : (
            <p className="text-gray-500">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

