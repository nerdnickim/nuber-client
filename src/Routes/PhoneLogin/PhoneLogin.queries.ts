import { gql } from "@apollo/client";

export const PHONE_SIGN_IN = gql`
	mutation PhoneVerification($phoneNumber: String!) {
		PhoneVerification(phoneNumber: $phoneNumber) {
			ok
			error
		}
	}
`;
