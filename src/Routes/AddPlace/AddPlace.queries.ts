import { gql } from "@apollo/client";

export const ADD_PLACE = gql`
	mutation AddPlace(
		$name: String!
		$lat: Float!
		$lng: Float!
		$address: String!
		$isFav: Boolean!
	) {
		AddPlace(name: $name, lat: $lat, lng: $lng, address: $address, isFav: $isFav) {
			ok
			error
		}
	}
`;
