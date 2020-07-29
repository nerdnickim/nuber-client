import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
	mutation UpdataMyProfile(
		$firstName: String!
		$lastName: String!
		$email: String!
		$profilePhoto: String!
	) {
		UpdataMyProfile(
			firstName: $firstName
			lastName: $lastName
			email: $email
			profilePhoto: $profilePhoto
		) {
			ok
			error
		}
	}
`;
