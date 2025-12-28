import React from "react";

const PostCard = ({ post, onLike, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
      <div className="p-4 flex items-center space-x-3">
        {post.userAvatar ? (
          <img src={post.userAvatar} alt={post.username} className="w-10 h-10 rounded-full object-cover"/>
        ) : (
          <div className="w-10 h-10 rounded-full bg-purple-300 flex items-center justify-center text-white font-bold">
            {post.username[0]}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-900">{post.username}</h3>
        </div>
      </div>

      {post.image && (
        <img src={post.image} alt="Post" className="w-full h-64 bg-fuchsia-400 object-contain cursor-pointer" onClick={onClick}/>
      )}

      <div className="p-4">
        <div className="flex items-center space-x-4 mb-3">
          <button onClick={onLike} className={`flex items-center space-x-1 ${post.isLiked ? "text-red-500" : "text-gray-600"} hover:text-red-500 transition-colors`}>
            <span className="text-xl">{post.isLiked ? "❤️" : "🤍"}</span>
            <span className="font-semibold">{post.likes || 0}</span>
          </button>

          <button onClick={onClick} className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors">
            <span className="text-xl">💬</span>
            <span className="font-semibold">{post.commentsCount || 0}</span>
          </button>
        </div>

        <p className="text-gray-800">{post.content || ""}</p>
      </div>
    </div>
  );
};

export default PostCard;
