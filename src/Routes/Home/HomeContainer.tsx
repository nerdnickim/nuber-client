import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import HomePresenter from "./HomePresenter";
import { useQuery } from "@apollo/client";
import { USER_PROFILE } from "../../Shared.queries";
import { userProfile } from "../../types/api";

const HomeContainer = ({ google }) => {
	let mapRef = useRef();
	const [mapRefS, setMapRefS] = useState(mapRef);
	const [state, setState] = useState({
		lat: 0,
		lng: 0,
		isMenuOpen: false,
		map: google.maps.Map,
		userMarker: google.maps.Marker,
	});
	const { loading } = useQuery<userProfile>(USER_PROFILE);

	const toggleMenu = () => {
		setState((prev) => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
	};

	const loadMap = (lat, lng) => {
		const maps = google.maps;
		const mpaNode = ReactDOM.findDOMNode(mapRef.current);
		const mapConfig = (google.maps.MapOptions = {
			center: {
				lat,
				lng,
			},
			disableDefaultUI: true,
			zoom: 8,
			minZoom: 15,
		});
		state.map = new maps.Map(mpaNode, mapConfig);
		setMapRefS(mapRefS);

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
		state.userMarker = new maps.Marker(userMarkerOptions);
		state.userMarker.setMap(state.map);
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
		state.userMarker.setPosition({ lat: latitude, lng: longitude });
		state.map.panTo({ lat: latitude, lng: longitude });
	};
	const handleGeoWatchError = () => {
		console.log("Error watching you");
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
	}, []);
	return (
		<HomePresenter
			state={state}
			toggleMenu={toggleMenu}
			loading={loading}
			mapRef={mapRefS}
		/>
	);
};

export default HomeContainer;
