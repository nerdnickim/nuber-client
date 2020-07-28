import { gql } from "@apollo/client";

export const FACEBOOK_CONNECT = gql`
	mutation FaceBookConnect(
		$firstName: String!
		$lastName: String!
		$email: String
		$fbId: String!
	) {
		FaceBookConnect(
			firstName: $firstName
			lastName: $lastName
			email: $email
			fbId: $fbId
		) {
			ok
			error
			token
		}
	}
`;
