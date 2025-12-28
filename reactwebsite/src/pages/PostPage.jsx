import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: loggedInUser } = useContext(UserContext);
  const commentsRef = useRef(null);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!loggedInUser) return;

    setPost({
      _id: id,
      content: "This is a mock post for Task 4 🚀",
      image: `https://picsum.photos/seed/${id}/800/600`,
      likes: 12,
      user: {
        name: loggedInUser.name,
      },
    });

    setComments([
      {
        _id: "1",
        user: loggedInUser.name,
        text: "Looks great!",
        createdAt: new Date().toISOString(),
      },
    ]);
  }, [id, loggedInUser]);

  useEffect(() => {
    commentsRef.current?.scrollTo(0, commentsRef.current.scrollHeight);
  }, [comments]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        _id: Date.now().toString(),
        user: loggedInUser.name,
        text: newComment,
        createdAt: new Date().toISOString(),
      },
    ]);

    setNewComment("");
  };

  if (!post) return <p className="text-center mt-8">Loading post...</p>;

  return (
    <div className="min-h-screen bg-[linear-gradient(to_right,#91A6FF,#FF88DC)] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-4 text-purple-700 font-semibold">
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
          <img src={post.image} alt="Post" className="w-full md:w-2/3 object-cover"/>

          <div className="md:w-1/3 p-4 flex flex-col">
            <h3 className="font-bold mb-2">{post.user.name}</h3>
            <p className="mb-4 text-gray-700">{post.content}</p>

            <div className="mb-3">
              ❤️ {post.likes} · 💬 {comments.length}
            </div>

            <div ref={commentsRef} className="flex-1 overflow-y-auto space-y-2 mb-4">
              {comments.map((c) => (
                <div key={c._id}>
                  <p className="text-sm font-semibold">{c.user}</p>
                  <p className="text-sm">{c.text}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..." className="flex-1 border rounded px-2 py-1"/>
              <button type="submit" className="bg-purple-600 text-white px-3 rounded">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;



