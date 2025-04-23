import { useState, useEffect } from "react";
// import { searchGithubUser } from "../api/API";
import  { CandidateDetails } from "../interfaces/Candidate.interface"


const SavedCandidates = () => {

  const [users, setCandidateList] = useState<CandidateDetails[]>([]);

  const removeFromStorage = (
    e: { preventDefault: () => void; },
    userId: any
  ) => {
    e.preventDefault();
    if (userId !== undefined) {
      let parsedCandidatesList: CandidateDetails[] = [];

      const savedCandidatesList = localStorage.getItem('savedCandidates');

      if (typeof savedCandidatesList === 'string') {
        parsedCandidatesList = JSON.parse(savedCandidatesList)
      }

      parsedCandidatesList = parsedCandidatesList.filter(
        (users) => users.id !== userId
      );

      setCandidateList(parsedCandidatesList);
      localStorage.setItem('savedCandidates', JSON.stringify(parsedCandidatesList));
    }
  }
  useEffect(() => {
    const savedUsers = localStorage.getItem('savedCandidates');
  
    try {
      const parsedSavedUsers = JSON.parse(savedUsers || '[]');
      if (Array.isArray(parsedSavedUsers)) {
        setCandidateList(parsedSavedUsers);
      } else {
        console.error('Saved candidates data is not an array:', parsedSavedUsers);
        setCandidateList([]);
      }
    } catch (err) {
      console.error('Failed to parse saved candidates:', err);
      setCandidateList([]);
    }
  }, []);


  return (
    <div>
      <h1>Potential Candidates</h1>
      {users.length > 0 ? (
      <table className="table">
        <thead>
          <tr className="tr">
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody className="tbody">
						{users.map((user, index) => (
							<tr key={index}>
								<td>
									<img
										src={user?.avatar_url}
										className="table-row-image"
									/>
								</td>
								<td>
									{user.name ? user.name : 'No name found.'}
								</td>
								<td>
									{user.login ? user.login : 'No name found.'}
								</td>
								<td>
									{user.location ? user.location : 'No location found.'}
								</td>
								<td>
									{user.email ? user.email : 'No email found.'}
								</td>
								<td>
									{user.html_url? user.html_url : 'No URL found.'}
								</td>
								<td>
									{user.company ? user.company : 'No company found.'}
								</td>
								<td>
                  {user.bio ? user.bio : 'No bio found.'}</td>
								<td>
									<button
										onClick={(e) =>
											removeFromStorage(e, user.id)
										}
										className="minus-button2">
										{' '}
									</button>
								</td>
							</tr>
						))}
					</tbody>
      </table>
      ) : (
        <p className="noCandidates">No candidates have been accepted.</p>
      )}
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

