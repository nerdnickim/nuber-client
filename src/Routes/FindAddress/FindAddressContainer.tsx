import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import FindAddressPresenter from "./FindAddressPresenter";
import { reverseGeoCode, geoCode } from "src/mapHelpers";
import { useHistory } from "react-router-dom";

const FindAddressContainer = ({ google }) => {
	let mapRef = useRef();
	const history = useHistory();
	const [map, setMap] = useState<any>();
	const [mapRefS, setMapRefS] = useState(mapRef);
	const [state, setState] = useState({
		lat: 0,
		lng: 0,
		address: "",
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
			zoom: 8,
			minZoom: 15,
		});
		let map: google.maps.Map = new maps.Map(mpaNode, mapConfig);
		setMap(map);
		setMapRefS(mapRefS);
		map.addListener("dragend", async () => {
			const newCenter = map.getCenter();
			const lat = newCenter.lat();
			const lng = newCenter.lng();
			setState((prev) => ({ ...prev, lat, lng }));
			const reverseAddress = await reverseGeoCode(lat, lng);
			if (reverseAddress !== false) {
				setState((prev) => ({ ...prev, address: reverseAddress }));
			}
		});
	};

	const handleGeoSucces = async (position: Position) => {
		const {
			coords: { latitude, longitude },
		} = position;
		const reverseAddress = await reverseGeoCode(latitude, longitude);
		setState((prev) => ({
			...prev,
			lat: latitude,
			lng: longitude,
			address: reverseAddress,
		}));

		loadMap(latitude, longitude);
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
			const { lat, lng, formatted_address } = result;
			setState((prev) => ({ ...prev, lat, lng, address: formatted_address }));
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
	}, []);

	return (
		<FindAddressPresenter
			mapRef={mapRefS}
			address={state.address}
			onBlur={onInputBlur}
			onChange={onInputChange}
			onPickPlace={onPickPlace}
		/>
	);
};

export default FindAddressContainer;
