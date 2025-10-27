import React, {useState,useEffect,useRef} from "react";
import {useParams,useNavigate} from "react-router-dom";
import posts from "../data/posts";
import commentsData from "../data/comments";
import users from "../data/users";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedPost = posts.find((p) => p.id === parseInt(id));

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(
    selectedPost
      ? commentsData.filter((c) => c.postId === selectedPost.id)
      : []
  );

  const commentsRef = useRef(null);

  useEffect(() => {
    commentsRef.current?.scrollTo(0, commentsRef.current.scrollHeight);
  }, [comments]);

  if (!selectedPost) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <p className="text-gray-500">Post not found.</p>
        <button onClick={() => navigate(-1)} className="ml-4 text-purple-600 hover:text-purple-700">
          Go Back
        </button>
      </div>
    );
  }

  const postUser = users.find((u) => u.id === selectedPost.userId);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newC = {
      id: Date.now(),
      postId: selectedPost.id,
      userId: 0, 
      username: "You",
      comment: newComment,
      timestamp: new Date().toISOString(),
    };

    setComments([...comments, newC]);
    setNewComment("");
  };

  return (
    <div className="max-h-screen bg-[linear-gradient(to_right,#91A6FF,#FF88DC)]">
    <div className="min-h-full bg-[linear-gradient(to_right,#91A6FF,#FF88DC)]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center space-x-2 text-purple-600 hover:text-purple-700">
          <span>←</span>
          <span>Back to Feed</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
          <img src={selectedPost.image} alt="Post" className="w-full md:w-2/3 h-96 object-cover"/>
          <div className="md:w-1/3 p-6 flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <img src={postUser.avatar} alt={postUser.username} className="w-12 h-12 rounded-full object-cover"/>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {postUser.username}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(selectedPost.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-gray-800 mb-4">{selectedPost.content}</p>

            <div className="flex items-center space-x-4 mb-4 border-b pb-3">
              <span>❤️ {selectedPost.likes}</span>
              <span>💬 {comments.length}</span>
            </div>

            <div ref={commentsRef} className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-64">
              {comments.map((c) => {
                const commentUser =
                  c.userId === 0
                    ? { username: "You", avatar: "https://i.pravatar.cc/150?img=0" }
                    : users.find((u) => u.id === c.userId);

                return (
                  <div key={c.id} className="flex space-x-2">
                    <img src={commentUser.avatar} alt={commentUser.username} className="w-8 h-8 rounded-full object-cover"/>
                    <div>
                      <p className="text-sm font-semibold">
                        {commentUser.username}
                      </p>
                      <p className="text-sm text-gray-700">{c.comment}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(c.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleCommentSubmit} className="flex space-x-2">
              <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..." className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"/>
              <button type="submit" disabled={!newComment.trim()} className="gradient-bg text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PostPage;

