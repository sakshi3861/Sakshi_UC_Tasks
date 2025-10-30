import React, {useState} from "react";

const UserCard = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  const handleFollow = (e) => {
  e.stopPropagation(); 
  setIsFollowing(!isFollowing);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="text-center">
        <img src={user.avatar} alt={`user avatar`} className="w-20 h-20 rounded-full object-cover mx-auto mb-4"/>
        <h3 className="font-semibold text-gray-900 mb-1">{user.name}</h3>
        <p className="text-gray-600 text-sm mb-2">@{user.username}</p>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{user.bio}</p>

        <button onClick={handleFollow} className={`w-full py-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300 ${ isFollowing? "bg-gray-200 text-gray-700 hover:bg-gray-300": "bg-linear-to-r from-purple-600 to-purple-400 text-white hover:opacity-90"}`}>
          {isFollowing ? "Following" : "Follow"}
        </button>

      </div>
    </div>
  );
};

export default UserCard;
