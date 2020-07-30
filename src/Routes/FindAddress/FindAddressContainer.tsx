import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import FindAddressPresenter from "./FindAddressPresenter";

const FindAddressContainer = ({ google }) => {
	let mapRef = useRef();
	const [mapRefS, setMapRefS] = useState(mapRef);
	const [state] = useState({
		lat: 0,
		lng: 0,
	});

	const loadMap = (lat, lng) => {
		const maps = google.maps;
		const mpaNode = ReactDOM.findDOMNode(mapRef.current);
		const mapConfig = (google.maps.MapOptions = {
			center: {
				lat,
				lng,
			},
			disableDefaultUI: true,
			zoom: 20,
		});
		let map: google.maps.Map = new maps.Map(mpaNode, mapConfig);
		setMapRefS(mapRefS);
		map.addListener("dragend", () => {
			const newCenter = map.getCenter();
			const lat = newCenter.lat();
			const lng = newCenter.lng();

			state.lat = lat;
			state.lng = lng;
		});
	};

	const handleGeoSucces = (position: Position) => {
		const {
			coords: { latitude, longitude },
		} = position;
		state.lat = latitude;
		state.lng = longitude;

		loadMap(latitude, longitude);
	};

	const handleError = () => {
		return;
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(handleGeoSucces, handleError);
	}, []);

	return <FindAddressPresenter mapRef={mapRefS} />;
};

export default FindAddressContainer;
