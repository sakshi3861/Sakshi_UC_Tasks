import React, {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import UserCard from "../components/UserCard";
import usersData from "../data/users"; 

const DiscoverPeoplePage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usersWithFollow = usersData.map(user => ({
      ...user,
      isFollowing: false, 
    }));
    setUsers(usersWithFollow);
  }, []);

  const toggleFollow = (id, e) => {
    e.stopPropagation(); 
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  return (
    <div className="min-h-full bg-[linear-gradient(to_right,#91A6FF,#FF88DC)] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Discover People ✨
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <div key={user.id} onClick={() => navigate(`/profile/${user.username}`)} className="cursor-pointer">
              <UserCard user={user} onToggleFollow={e => toggleFollow(user.id, e)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverPeoplePage;

