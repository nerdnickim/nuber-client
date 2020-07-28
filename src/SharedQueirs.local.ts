import { gql } from "@apollo/client";

export const IS_LOGGED_IN = gql`
	mutation logUserIn($token: String!) {
		logUserIn(token: $token) @client
	}
`;
