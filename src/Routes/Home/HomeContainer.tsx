/*Global googl */
import React, { useState, useCallback, useEffect } from "react";
import HomePresenter from "./HomePresenter";
import {
	useQuery,
	useMutation,
	useSubscription,
	SubscribeToMoreOptions,
} from "@apollo/client";
import {
	userProfile,
	getDrivers,
	reportMovement,
	reportMovementVariables,
	requestRide,
	requestRideVariables,
	getNearbyRide,
	updateRideStatusVariables,
	updateRideStatus,
	neabyRideSubscription,
} from "src/types/api";
import { USER_PROFILE } from "src/Shared.queries";
import { geoCode, reverseGeoCode } from "src/mapHelpers";
import {
	GET_NEARBY_DRIVERS,
	REPORT_LOCATION,
	REQUEST_RIDE,
	GET_NEARBY_RIDE,
	UPDATE_RIDE_STATUS,
	SUBSCRIBE_NEARBY_RIDES,
} from "./Home.queries";
import { toast } from "react-toastify";

interface IProps {
	google: any;
}

const HomeContainer: React.FC<IProps> = () => {
	const [mapT, setMap] = useState<any>(null);
	const [state, setState] = useState({
		isMenuOpen: false,
		lat: 0,
		lng: 0,
		toAddress: "",
		address: "",
		toLat: 0,
		toLng: 0,
		travelMode: "DRIVING",
		response: undefined,
		distance: "",
		duration: "",
		price: 0,
		isDriving: false,
	});

	const [driversState, setDriversState] = useState([{ id: 0, lat: 0, lng: 0 }]);
	const [updateRideMutation] = useMutation<updateRideStatus, updateRideStatusVariables>(
		UPDATE_RIDE_STATUS
	);
	const { loading, data: getUserProfile } = useQuery<userProfile>(USER_PROFILE);
	useSubscription<neabyRideSubscription>(SUBSCRIBE_NEARBY_RIDES, {
		skip: !getUserProfile?.GetMyProfile?.user?.isDriving,
	});
	const { data: getNearbyRideData, subscribeToMore } = useQuery<getNearbyRide>(
		GET_NEARBY_RIDE,
		{
			skip: !getUserProfile?.GetMyProfile?.user?.isDriving,
		}
	);
	const [requestRideMutation] = useMutation<requestRide, requestRideVariables>(
		REQUEST_RIDE
	);
	useQuery<getDrivers>(GET_NEARBY_DRIVERS, {
		pollInterval: 1000,
		skip: getUserProfile?.GetMyProfile?.user?.isDriving === true,
		onCompleted: async (data) => {
			if (data) {
				const {
					GetNearbyDrivers: { ok, drivers },
				} = data;
				if (ok && drivers) {
					for (const driver of drivers) {
						if (driver && driver.lastLat && driver.lastLng) {
							const { lastLat, lastLng, id } = driver;
							driversState.map((p) => [
								(p.id = id),
								(p.lat = lastLat),
								(p.lng = lastLng),
							]);
							setDriversState([{ id: id, lat: lastLat, lng: lastLng }]);
						}
					}
				}
			}
		},
	});

	const [useReportMutation] = useMutation<reportMovement, reportMovementVariables>(
		REPORT_LOCATION
	);

	const toggleMenu = () => {
		setState({ ...state, isMenuOpen: !state.isMenuOpen });
	};

	const handleGeoSucces = useCallback(
		async (position: Position) => {
			const {
				coords: { latitude, longitude },
			} = position;

			const reverseResult = await reverseGeoCode(latitude, longitude);

			// eslint-disable-next-line react-hooks/rules-of-hooks
			await useReportMutation({
				variables: { lat: 46.23, lng: 2.21 },
			});

			if (
				getUserProfile &&
				getUserProfile?.GetMyProfile &&
				getUserProfile?.GetMyProfile?.user
			) {
				const {
					GetMyProfile: { user },
				} = getUserProfile;
				state.isDriving = user.isDriving;
				setState({
					...state,
					lat: latitude,
					lng: longitude,
					address: reverseResult,
					isDriving: user?.isDriving,
				});
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[getUserProfile, useReportMutation]
	);

	const handleGeoError = () => {};

	const requestHandle = async () => {
		const { data } = await requestRideMutation({
			variables: {
				pickUpAddress: state.address,
				pickUpLat: state.lat,
				pickUpLng: state.lng,
				dropOffAddress: state.toAddress,
				dropOffLat: state.toLat,
				dropOffLng: state.toLng,
				price: state.price,
				distance: state.distance,
				duration: state.duration,
			},
		});
		if (data) {
			const { RequestRide } = data;
			if (RequestRide.ok) {
				toast.success("Drive requested, finding a driver");
			} else {
				toast.error(RequestRide.error);
			}
		}
		const rideSubscriptionOptions: SubscribeToMoreOptions = {
			document: SUBSCRIBE_NEARBY_RIDES,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return prev;
				}

				const newObject = Object.assign({}, prev, {
					GetNearbyRide: {
						...prev.GetNearbyRide,
						ride: subscriptionData.data.NeabyRideSubscription,
					},
				});
				return newObject;
			},
		};

		if (getUserProfile?.GetMyProfile?.user?.isDriving) {
			subscribeToMore(rideSubscriptionOptions);
		}
	};

	const onAddressSubmit = async () => {
		const result = await geoCode(state.toAddress);
		const bounds = new window.google.maps.LatLngBounds();

		if (result !== false) {
			const { lat, lng, formatted_address } = result;
			bounds.extend({ lat, lng });
			bounds.extend({ lat: state.lat, lng: state.lng });
			mapT.fitBounds(bounds);

			state.toLat = lat;
			state.toLng = lng;
			state.toAddress = formatted_address;

			setState({
				...state,
				toLat: lat,
				toLng: lng,
				toAddress: formatted_address,
			});
		}
	};

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = event;
		setState({ ...state, toAddress: value });
	};

	const setPrice = () => {
		const { distance } = state;
		if (distance) {
			setState({
				...state,
				price: parseFloat(Number(parseFloat(distance.replace(",", "")) * 3).toFixed(2)),
			});
		}
	};

	const onCallback = (result) => {
		const renderOptions: google.maps.DirectionsRendererOptions = {
			polylineOptions: {
				strokeColor: "#000",
			},
			suppressMarkers: true,
		};
		let directions = new google.maps.DirectionsRenderer(renderOptions);

		if (result?.status === "OK") {
			const { routes } = result;
			const {
				distance: { text: distance },
				duration: { text: duration },
			} = routes[0].legs[0];

			directions.setDirections(result);
			directions.setMap(mapT);
			setState({ ...state, distance, duration });
			setPrice();
		}
	};

	const onLoad = useCallback(function callback(map) {
		setMap(map);
	}, []);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
	}, [handleGeoSucces]);

	return (
		<>
			{getUserProfile?.GetMyProfile?.user && (
				<HomePresenter
					onLoad={onLoad}
					state={state}
					toggleMenu={toggleMenu}
					loading={loading}
					onChange={onInputChange}
					onSubmit={onAddressSubmit}
					callback={onCallback}
					getUserProfile={getUserProfile}
					driversState={driversState}
					requestHandle={requestHandle}
					getRide={getNearbyRideData}
					updateRideMutation={updateRideMutation}
				/>
			)}
		</>
	);
};

export default React.memo(HomeContainer);
