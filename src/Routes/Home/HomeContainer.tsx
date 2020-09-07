/*Global googl */
import React, { useState, useCallback, useEffect } from "react";

import HomePresenter from "./HomePresenter";
import { useQuery } from "@apollo/client";
import { userProfile } from "src/types/api";
import { USER_PROFILE } from "src/Shared.queries";
import { geoCode, reverseGeoCode } from "src/mapHelpers";

interface IProps {
	google: any;
}

const HomeContainer: React.FC<IProps> = () => {
	const { loading } = useQuery<userProfile>(USER_PROFILE);

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

	const toggleMenu = () => {
		setState({ ...state, isMenuOpen: !state.isMenuOpen });
	};

	const handleGeoSucces = async (position: Position) => {
		const {
			coords: { latitude, longitude },
		} = position;
		setState({ ...state, lat: latitude, lng: longitude });

		const reverseResult = await reverseGeoCode(latitude, longitude);
		setState({ ...state, address: reverseResult });
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
	});

	return (
		<HomePresenter
			onLoad={onLoad}
			state={state}
			toggleMenu={toggleMenu}
			loading={loading}
			onChange={onInputChange}
			onSubmit={onAddressSubmit}
			callback={onCallback}
		/>
	);
};

export default React.memo(HomeContainer);
