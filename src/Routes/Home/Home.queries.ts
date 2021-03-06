import { gql } from "@apollo/client";

export const REPORT_LOCATION = gql`
	mutation reportMovement($lat: Float!, $lng: Float!) {
		ReportMovement(lastLat: $lat, lastLng: $lng) {
			ok
			error
		}
	}
`;

export const GET_NEARBY_DRIVERS = gql`
	query getDrivers {
		GetNearbyDrivers {
			ok
			error
			drivers {
				id
				lastLat
				lastLng
			}
		}
	}
`;

export const REQUEST_RIDE = gql`
	mutation requestRide(
		$pickUpAddress: String!
		$pickUpLat: Float!
		$pickUpLng: Float!
		$dropOffAddress: String!
		$dropOffLat: Float!
		$dropOffLng: Float!
		$price: Float!
		$distance: String!
		$duration: String!
	) {
		RequestRide(
			pickUpAddress: $pickUpAddress
			pickUpLat: $pickUpLat
			pickUpLng: $pickUpLng
			dropOffAddress: $dropOffAddress
			dropOffLat: $dropOffLat
			dropOffLng: $dropOffLng
			price: $price
			distance: $distance
			duration: $duration
		) {
			ok
			error
			ride {
				id
			}
		}
	}
`;

export const GET_NEARBY_RIDE = gql`
	query getNearbyRide {
		GetNearbyRide {
			ok
			error
			ride {
				id
				pickUpAddress
				dropOffAddress
				price
				distance
				duration
				passenger {
					fullName
					profilePhoto
				}
			}
		}
	}
`;

export const UPDATE_RIDE_STATUS = gql`
	mutation updateRideStatus($id: Int!) {
		UpdateRideStatus(id: $id, status: ACCEPTED) {
			ok
			error
		}
	}
`;

export const SUBSCRIBE_NEARBY_RIDES = gql`
	subscription neabyRideSubscription {
		NeabyRideSubscription {
			id
			pickUpAddress
			dropOffAddress
			price
			distance
			duration
			passenger {
				fullName
				profilePhoto
			}
		}
	}
`;
