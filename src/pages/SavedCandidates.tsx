import { useState, useEffect } from "react";
import { searchGithubUser } from "../api/API";


const SavedCandidates = () => {

  const [users, setCandidateList] = useState([]);

  const removeFromStorage = (
    e: { preventDefault: () => void; },
    userId: any
  ) => {
    e.preventDefault();
    if (userId !== undefined) {
      let parsedCandidatesList = [];

      const savedCandidatesList = localStorage.getItem('savedCandidates');

      if (typeof savedCandidatesList === 'string') {
        parsedCandidatesList = JSON.parse(savedCandidatesList)
      }

      parsedCandidatesList = parsedCandidatesList.filter(
        (user) => user.id !== id
      );

      setCandidateList(parsedCandidatesList);
      localStorage.setItem('savedCandidate', JSON.stringify(parsedCandidatesList));
    }
  }
  useEffect(() => {
    const parsedCandidatesList = JSON.parse(
      localStorage.getItem('savedCandidates') as string
    );
    setCandidateList(parsedCandidatesList);
  }, []);


  return (
    <div>
      <h1>Potential Candidates</h1>
      <table className="table">
        <tbody className="tbody">
          <tr className="tr">
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Remove</th>
          </tr>
          {users.map((user, index) =>
            <tr>
              <td>
                <img
                  src={user.avatar_url}
                >
                </img>
              </td>
              <td>{user.name}</td>
              <td>{user.location}</td>
              <td>{user.email}</td>
              <td>{user.bio}</td>
              <td>
                <button onClick={() =>
                  removeFromStorage(user.id)}>
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

}


export default SavedCandidates;


// type Props = {
//   usernames: string[];
// }

// const SavedCandidates = ({ usernames }: Props) => {
//   const [users, setUsers] = useState<any[]>([]);


//   // useEffect(() => {
//   //   const init = async () => {
//   //     const loadedUsers: any[] = []

//   //     for (let ii = 0; ii < usernames.length; ii++) {
//   //       const username = usernames[ii];
//   //       const user = await searchGithubUser(username);

//   //       if (user) {
//   //         loadedUsers.push(user);
//   //       }
//   //     }
//   //     return loadedUsers;
//   //   };

//   //   init()
//   //     .then((result) => {
//   //       setUsers(result);
//   //     })
//   //     .catch((err) => {
//   //       console.log("🚀 Unable to find users:", err)
//   //     });
//   // }, [usernames]);

//   // const handleRemoveUser = (userId: number) => {
//   //   const clonedUsers = [...users];

//   //   const userIndex = clonedUsers.findIndex(u => u.id === userId);
//   //   if (userIndex === undefined) {
//   //     return;
//   //   }
//   //   clonedUsers.splice(userIndex, 1)

//   //   setUsers(clonedUsers);

//   // };

//   return (
//     <div>
//       <h1>Potential Candidates</h1>
//       <table className="table">
//         <tbody className="tbody">
//           <tr className="tr">
//             <th>Image</th>
//             <th>Name</th>
//             <th>Location</th>
//             <th>Email</th>
//             <th>Company</th>
//             <th>Bio</th>
//             <th>Remove</th>
//           </tr>
//           {users.map((user, index) =>
//             <tr>
//               <td>
//                 <img
//                   src={user.avatar_url}
//                 >
//                 </img>
//               </td>
//               <td>{user.name}</td>
//               <td>{user.location}</td>
//               <td>{user.email}</td>
//               <td>{user.bio}</td>
//               {/* <td>{user.}</td> */}
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

