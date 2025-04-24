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


			{loadedUser.location ? (
				<p><strong>Location:</strong> {loadedUser.location}</p>
			) : (
				<p><strong>Location:</strong> No Location Found to render</p>
			)}

			{loadedUser.email ? (
				<p><strong>Email:</strong> {loadedUser.email}</p>
			) : (
				<p><strong>Email:</strong> No Email Found to render</p>
			)}

			{loadedUser.company ? (
				<p><strong>Company:</strong> {loadedUser.company}</p>
			) : (
				<p><strong>Company:</strong> No Company Found to render</p>
			)}

			{loadedUser.bio ? (
				<p><strong>Bio:</strong> {loadedUser.bio}</p>
			) : (
				<p><strong>Bio:</strong> No Bio Found to render</p>
			)}
		</div>
	);
};

export default CandidateCard;