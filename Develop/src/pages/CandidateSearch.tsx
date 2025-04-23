import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import type Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  // return <h1>CandidateSearch</h1>;

  //state
  const [users, setUsers] = useState<Candidate[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Candidate[]>([]);
  const [currentUser, setCurrentUser] = useState<Candidate | undefined>(undefined);

  //useEffect
  useEffect(() => {
    const initialize = async () => {
      const data = await searchGithub();
      return data;
    };
    initialize()
      .then((result) => {
        setUsers(result);
        if (result.length > 0) {
          setCurrentUser(result[0]);
        }
      })
      .catch((err: any) => {
        console.log('Error fetching users: ', err);
      });
  }, []);

  useEffect(() => {
    console.log("Selected users: ", selectedUsers);
  }, [selectedUsers])

  const findUserIndex = () => {
    const currentIndex = users.findIndex(
      u => u.id === currentUser?.id
    );

    if (currentIndex === undefined) {
      console.log('Unable to find index with current user', currentUser);
      return undefined;
    }
    if (currentIndex > users.length) {
      console.log('No candidates are available to review, starting over.');
      return 0;
    }

    return currentIndex;
  }

  //functions
  const handleNextUser = () => {
    const currentIndex = findUserIndex();
    if (currentIndex === undefined) {
      return;
    }

    setCurrentUser(users[currentIndex + 1]);
  };

  const handleSelectUser = () => {
    const currentIndex = findUserIndex();
    if (currentIndex === undefined) {
      return;
    }

    const selectedUsersClone = [...selectedUsers]

    if (currentUser) {
      selectedUsersClone.push(currentUser);
    }

    setSelectedUsers(selectedUsersClone);
    setCurrentUser(users[currentIndex + 1]);

    let parsedCandidates = []
    const savedCandidates = localStorage.getItem('savedCandidates');
    if (typeof savedCandidates === 'string') {
      parsedCandidates = JSON.parse(savedCandidates);
    }
    parsedCandidates.push(currentUser);
    localStorage.setItem(
      'savedCandidates',
      JSON.stringify(parsedCandidates)
    );

    setCurrentUser(users[currentIndex + 1]);

  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentUser ? (
        <div>
          <CandidateCard username={currentUser.login} />
          <div>
            <button onClick={handleNextUser}>Reject User</button>

            <button onClick={handleSelectUser}>Accept User</button>
          </div>

        </div>
      ) : null}
    </div>
  );
};

export default CandidateSearch;


