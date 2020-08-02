import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import HomePresenter from "./HomePresenter";
import { useQuery } from "@apollo/client";
import { USER_PROFILE } from "../../Shared.queries";
import { userProfile } from "../../types/api";
import { geoCode } from "src/mapHelpers";

const HomeContainer = ({ google }) => {
	let mapRef = useRef();

	let map: google.maps.Map;
	let userMarker: google.maps.Marker;
	let toMarker: google.maps.Marker;

	const [state, setState] = useState({
		lat: 0,
		lng: 0,
		toLat: 0,
		toLng: 0,
		isMenuOpen: false,
		address: "",
	});

	const { loading } = useQuery<userProfile>(USER_PROFILE);

	const toggleMenu = () => {
		setState((prev) => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
	};

	const loadMap = (lat, lng) => {
		const maps = google.maps;
		const mpaNode = ReactDOM.findDOMNode(mapRef.current);
		const mapConfig: google.maps.MapOptions = {
			center: {
				lat,
				lng,
			},
			disableDefaultUI: true,
			zoom: 8,
			minZoom: 13,
		};

		map = new maps.Map(mpaNode, mapConfig);

		const userMarkerOptions: google.maps.MarkerOptions = {
			icon: {
				path: maps.SymbolPath.CIRCLE,
				scale: 7,
			},
			position: {
				lat,
				lng,
			},
		};
		userMarker = new maps.Marker(userMarkerOptions);
		userMarker.setMap(map);
		const watchOptions: PositionOptions = {
			enableHighAccuracy: true,
		};

		navigator.geolocation.watchPosition(
			handleGeoWatchSuccess,
			handleGeoWatchError,
			watchOptions
		);
	};

	const handleGeoSucces = (position: Position) => {
		const {
			coords: { latitude, longitude },
		} = position;
		setState((prev) => ({ ...prev, lat: latitude, lng: longitude }));
		loadMap(latitude, longitude);
	};
	const handleGeoError = () => {
		console.log("No Location");
	};

	const handleGeoWatchSuccess = (position: Position) => {
		const {
			coords: { latitude, longitude },
		} = position;
		userMarker.setPosition({ lat: latitude, lng: longitude });
		map.panTo({ lat: latitude, lng: longitude });
	};
	const handleGeoWatchError = () => {
		console.log("Error watching you");
	};

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = event;
		setState((prev) => ({ ...prev, address: value }));
	};

	const onAddressSubmit = async () => {
		const maps = google.maps;
		const result = await geoCode(state.address);

		if (result !== false) {
			const { lat, lng, formatted_address } = result;
			setState((prev) => ({
				...prev,
				toLat: lat,
				toLng: lng,
				address: formatted_address,
			}));
			if (toMarker) {
				toMarker.setMap(null);
			}
			const toMarkerOptions: google.maps.MarkerOptions = {
				position: {
					lat,
					lng,
				},
			};

			toMarker = new maps.Marker(toMarkerOptions);
			toMarker.setMap(map);
		}
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
	}, []);
	return (
		<HomePresenter
			state={state}
			toggleMenu={toggleMenu}
			loading={loading}
			mapRef={mapRef}
			onChange={onInputChange}
			onSubmit={onAddressSubmit}
		/>
	);
};

export default HomeContainer;
