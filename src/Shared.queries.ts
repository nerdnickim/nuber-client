import { gql } from "@apollo/client";

export const USER_PROFILE = gql`
	query userProfile {
		GetMyProfile {
			ok
			error
			user {
				profilePhoto
				firstName
				lastName
				email
				fullName
				isDriving
			}
		}
	}
`;

export const GET_PLACES = gql`
	query GetMyPlaces {
		GetMyPlaces {
			ok
			error
			places {
				id
				name
				lat
				lng
				address
				isFav
				userId
				createdAt
				updatedAt
			}
		}
	}
`;
