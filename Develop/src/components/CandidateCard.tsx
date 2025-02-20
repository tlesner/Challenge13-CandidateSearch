import { useState, useEffect } from 'react';
import { searchGithubUser } from '../api/API';

type CandidateProps = {
	username: string;
};

const CandidateCard = ({ username }: CandidateProps) => {

	const [loadedUser, setLoadedUser] = useState<any>(undefined);

	useEffect(() => {
		const initialize = async () => {
			const data = await searchGithubUser(username);
			return data;
		};
		initialize()
			.then((result) => {
				setLoadedUser(result);
			})
			.catch((err: any) => {
				console.log('Error fetching users: ', err);
			});
	}, [username]);

	useEffect(() => {
		console.log("Loaded User", loadedUser)
	}, [loadedUser])

	if (!loadedUser) {
		return null;
	}

	return (
		<div>
			<img src={loadedUser?.avatar_url}></img>
			<h1>{loadedUser.name ? loadedUser.name : loadedUser.login}</h1>


			<h2>Location: </h2>
			{loadedUser.location ? (
				<p>{loadedUser.location}</p>
			) : (
				<p>No Location Found to render</p>
			)}

			<h2>Email: </h2>
			{loadedUser.email ? (
				<p>{loadedUser.email}</p>
			) : (
				<p>No Email Found to render</p>
			)}

			<h2>Company: </h2>
			{loadedUser.company ? (
				<p>{loadedUser.company}</p>
			) : (
				<p>No Company Found to render</p>
			)}

			<h2>Bio: </h2>
			{loadedUser.bio ? (
				<p>{loadedUser.bio}</p>
			) : (
				<p>No Bio Found to render</p>
			)}
		</div>
	);
};

export default CandidateCard;