import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import FindAddressPresenter from "./FindAddressPresenter";
import { reverseGeoCode, geoCode } from "src/mapHelpers";
import { useHistory } from "react-router-dom";

const FindAddressContainer = ({ google }) => {
	let mapRef = useRef();
	let map = google.maps.Map;
	const history = useHistory();
	const [state, setState] = useState({
		lat: 0,
		lng: 0,
		address: "",
	});

	const reverseGeoCodeAddress = async (lat: number, lng: number) => {
		const reverseAddress = await reverseGeoCode(lat, lng);

		if (reverseAddress !== false) {
			setState((prev) => ({ ...prev, address: reverseAddress }));
		}
	};

	const handleDragEnd = () => {
		const newCenter = map.getCenter();
		const lat = newCenter.lat();
		const lng = newCenter.lng();
		setState((prev) => ({ ...prev, lat, lng }));
		reverseGeoCodeAddress(lat, lng);
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
			minZoom: 8,
			zoom: 11,
		};

		map = new maps.Map(mpaNode as HTMLElement, mapConfig);
		map.addListener("dragend", handleDragEnd);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleGeoSucces = (position: Position) => {
		const {
			coords: { latitude, longitude },
		} = position;

		setState((prev) => ({
			...prev,
			lat: latitude,
			lng: longitude,
		}));
		loadMap(latitude, longitude);
		reverseGeoCodeAddress(latitude, longitude);
	};

	const handleError = () => {
		return;
	};

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = event;
		setState((prev) => ({ ...prev, address: value }));
	};

	const onInputBlur = async () => {
		const result = await geoCode(state.address);

		if (result !== false) {
			const { lat, lng, formatted_address: formatedAddress } = result;
			setState((prev) => ({ ...prev, lat, lng, address: formatedAddress }));
			map.panTo({ lat, lng });
		}
	};

	const onPickPlace = () => {
		const { lat, lng, address } = state;
		history.push({
			pathname: "/add-place",
			state: {
				lat,
				lng,
				address,
			},
		});
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(handleGeoSucces, handleError);
	});

	return (
		<FindAddressPresenter
			mapRef={mapRef}
			address={state.address}
			onBlur={onInputBlur}
			onChange={onInputChange}
			onPickPlace={onPickPlace}
		/>
	);
};

export default FindAddressContainer;
