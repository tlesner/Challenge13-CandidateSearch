// TODO: Create an interface for the Candidate objects returned by the API

export default interface Candidate {
    readonly id: number;
    readonly login: string;
}

export interface CandidateDetails {
	readonly id: number;
	readonly name: string;
	readonly avatar_url: string;
	readonly login: string;
	readonly location: string;
	readonly email: string;
	readonly html_url: string;
	readonly company: string;
	readonly bio: string;
}