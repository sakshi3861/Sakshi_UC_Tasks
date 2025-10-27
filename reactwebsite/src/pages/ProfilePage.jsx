import React, {useState,useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";
import PostCard from "../components/PostCard";
import usersData from "../data/users"; 
import postsData from "../data/posts"; 

const ProfilePage = () => {
  const { username } = useParams();
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

    const storedBio = localStorage.getItem(`${foundUser.username}_bio`);
    setBio(storedBio || foundUser.bio);

    const postsForUser = postsData
      .filter((post) => post.userId === foundUser.id)
      .sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ); 
    setUserPosts(postsForUser);
  }, [username, navigate]);

  if (!user) return null; 

  const handleSaveBio = () => {
    localStorage.setItem(`${user.username}_bio`, bio);
    setIsEditing(false);
  };

  return (
    <div className="min-h-full bg-[linear-gradient(to_right,#91A6FF,#FF88DC)] px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8">
          <img src={user.avatar} alt={user.username} className="w-24 h-24 rounded-full object-cover border-4 border-purple-500"/>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>

            <div className="mt-4">
              {isEditing ? (
                <div className="flex flex-col space-y-2">
                  <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="border rounded-lg p-2 text-sm w-full focus:ring-2 focus:ring-purple-500" autoFocus maxLength={150}/>
                  <button onClick={handleSaveBio} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-700 mt-2">{bio}</p>
                  <button onClick={() => setIsEditing(true)} className="text-purple-600 text-sm font-semibold mt-2 hover:underline">
                    Edit Bio
                  </button>
                </>
              )}
            </div>
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

