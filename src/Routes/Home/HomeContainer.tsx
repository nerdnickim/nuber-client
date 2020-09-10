/*Global googl */
import React, { useState, useCallback, useEffect } from "react";

import HomePresenter from "./HomePresenter";
import { useQuery, useMutation } from "@apollo/client";
import {
	userProfile,
	getDrivers,
	reportMovement,
	reportMovementVariables,
} from "src/types/api";
import { USER_PROFILE } from "src/Shared.queries";
import { geoCode, reverseGeoCode } from "src/mapHelpers";
import { GET_NEARBY_DRIVERS, REPORT_LOCATION } from "./Home.queries";

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
		price: "",
	});
	const [driversState, setDriversState] = useState([{ id: 0, lat: 0, lng: 0 }]);
	const { loading, data: getUserProfile } = useQuery<userProfile>(USER_PROFILE);

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

	const handleGeoSucces = async (position: Position) => {
		const {
			coords: { latitude, longitude },
		} = position;

		const reverseResult = await reverseGeoCode(latitude, longitude);

		setState({
			...state,
			lat: latitude,
			lng: longitude,
			address: reverseResult,
		});
		// eslint-disable-next-line react-hooks/rules-of-hooks
		await useReportMutation({
			variables: { lat: 46.23, lng: 2.21 },
		});
	};

	const handleGeoError = () => {};

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
				price: Number(parseFloat(distance.replace(",", "")) * 3).toFixed(2),
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<React.Fragment>
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
				/>
			)}
		</React.Fragment>
	);
};

export default React.memo(HomeContainer);
