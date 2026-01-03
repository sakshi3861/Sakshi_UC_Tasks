// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import UserCard from "../components/UserCard";
// import { UserContext } from "../context/UserContext";
// import usersData from "../data/users";

// const DiscoverPeoplePage = () => {
//   const { user: loggedInUser } = useContext(UserContext);
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loggedInUser) return;

//     const usersWithFollow = usersData
//       .filter(user => user.username !== loggedInUser.username)
//       .map(user => ({ ...user, isFollowing: false }));

//     setUsers(usersWithFollow);
//   }, [loggedInUser]);

//   const toggleFollow = (id, e) => {
//     e.stopPropagation(); 
//     setUsers(prev =>
//       prev.map(user =>
//         user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
//       )
//     );
//   };

//   if (!loggedInUser) return <p className="text-center mt-8">Please log in.</p>;

//   return (
//     <div className="min-h-full bg-[linear-gradient(to_right,#91A6FF,#FF88DC)] px-4 py-8">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
//           Discover People
//         </h2>

//         {users.length === 0 ? (
//           <p className="text-center text-gray-600">No users found.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {users.map(user => (
//               <div key={user.id} onClick={() => navigate(`/profile/${user.username}`)} className="cursor-pointer" role="button" tabIndex={0} onKeyPress={e => e.key === "Enter" && navigate(`/profile/${user.username}`)}>
//                 <UserCard user={user} onToggleFollow={e => toggleFollow(user.id, e)}/>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DiscoverPeoplePage;

// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import UserCard from "../components/UserCard";
// import { UserContext } from "../context/UserContext";
// import { getAllUsers } from "../api/auth"; // ✅ named import

// const DiscoverPeoplePage = () => {
//   const { user: loggedInUser, loading: userLoading } = useContext(UserContext);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [followed, setFollowed] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loggedInUser) return;

//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const allUsers = await getAllUsers(); // use your function
//         const usersToShow = allUsers.filter(user => user.id !== loggedInUser.id);
//         setUsers(usersToShow);
//       } catch (err) {
//         console.error("Failed to fetch users:", err);
//         setUsers([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [loggedInUser]);

//   const toggleFollow = (id, e) => {
//     e.stopPropagation();
//     setFollowed(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   if (userLoading || loading) return <p className="text-center mt-8">Loading users...</p>;
//   if (!loggedInUser) return <p className="text-center mt-8">Please log in.</p>;

//   return (
//     <div className="min-h-full bg-[linear-gradient(to_right,#91A6FF,#FF88DC)] px-4 py-8">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
//           Discover People
//         </h2>

//         {users.length === 0 ? (
//           <p className="text-center text-gray-600">No users found.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {users.map(user => (
//               <div
//                 key={user.id}
//                 onClick={() => navigate(`/profile/${user.id}`)}
//                 className="cursor-pointer"
//                 role="button"
//                 tabIndex={0}
//                 onKeyPress={e => e.key === "Enter" && navigate(`/profile/${user.id}`)}
//               >
//                 <UserCard
//                   user={{
//                     ...user,
//                     isFollowing: followed[user.id] || false,
//                     avatar: `https://i.pravatar.cc/150?u=${user.id}`,
//                   }}
//                   onToggleFollow={e => toggleFollow(user.id, e)}
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DiscoverPeoplePage;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import { UserContext } from "../context/UserContext";
import { getAllUsers } from "../api/auth";

const DiscoverPeoplePage = () => {
  const { user: loggedInUser, loading: userLoading } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) return;

    const fetchUsersWithImages = async () => {
      setLoading(true);
      try {
        const allUsers = await getAllUsers();
        const usersToShow = allUsers.filter(user => user.id !== loggedInUser.id);

        // Fetch random user images
        const res = await fetch(`https://randomuser.me/api/?results=${usersToShow.length}&inc=picture`);
        const data = await res.json();

        // Map each user to a real image
        const usersWithImages = usersToShow.map((user, index) => ({
          ...user,
          avatar: data.results[index]?.picture?.medium || `https://i.pravatar.cc/150?u=${user.id}`, // fallback
        }));

        setUsers(usersWithImages);
      } catch (err) {
        console.error("Failed to fetch users or images:", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersWithImages();
  }, [loggedInUser]);

  const toggleFollow = (id, e) => {
    e.stopPropagation();
    setFollowed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (userLoading || loading) return <p className="text-center mt-8">Loading users...</p>;
  if (!loggedInUser) return <p className="text-center mt-8">Please log in.</p>;

  return (
    <div className="min-h-full bg-[linear-gradient(to_right,#91A6FF,#FF88DC)] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Discover People
        </h2>

        {users.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
              <div
                key={user.id}
                onClick={() => navigate(`/profile/${user.id}`)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyPress={e => e.key === "Enter" && navigate(`/profile/${user.id}`)}
              >
                <UserCard
                  user={{
                    ...user,
                    isFollowing: followed[user.id] || false,
                  }}
                  onToggleFollow={e => toggleFollow(user.id, e)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverPeoplePage;
