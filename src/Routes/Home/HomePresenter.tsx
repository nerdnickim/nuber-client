import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "../../typed-components";
import Menu from "../../Components/Menu";
import AddressBar from "src/Components/AddressBar";
import Button from "src/Components/Button";
import { GoogleMap, LoadScript, Marker, DirectionsService } from "@react-google-maps/api";
import { MAPS_KEY } from "src/keys";
import { marker_Me, marker_driver } from "src/Components/Icons";
import RidePopUp from "src/Components/RidePopUp";
import {
	userProfile,
	getNearbyRide,
	updateRideStatus,
	updateRideStatusVariables,
} from "src/types/api";
import { MutationFunctionOptions } from "@apollo/client";

const Container = styled.div``;

const MunuButton = styled.button`
	appearance: none;
	padding: 10px;
	position: absolute;
	top: 10px;
	left: 10px;
	text-align: center;
	font-weight: 800;
	border: 0;
	cursor: pointer;
	font-size: 20px;
	transform: rotate(90deg);
	z-index: 2;
	background-color: transparent;
`;

const ExtendedButton = styled.div`
	position: absolute;
	bottom: 50px;
	left: 0;
	right: 0;
	margin: auto;
	z-index: 10;
	height: auto;
	width: 80%;
`;

const RequestButton = styled(ExtendedButton)`
	bottom: 200px;
`;

const containerStyle = {
	width: "100%",
	height: "100%",
};

interface IProps {
	onLoad: (map: any) => void;
	state: {
		isMenuOpen: boolean;
		lat: number;
		lng: number;
		toAddress: string;
		address: string;
		toLat: number;
		toLng: number;
		travelMode: any;
		response: undefined;
		distance: string;
		duration: string;
		price: number | string;
		isDriving: boolean;
	};
	toggleMenu: () => void;
	loading: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: () => Promise<void>;
	callback: (result: any) => void;
	getUserProfile: userProfile;
	driversState: {
		id: number;
		lat: number;
		lng: number;
	}[];
	requestHandle: () => Promise<void>;
	getRide: getNearbyRide | undefined;
	updateRideMutation: (
		options?:
			| MutationFunctionOptions<updateRideStatus, updateRideStatusVariables>
			| undefined
	) => Promise<any>;
}

const HomePresenter: React.FC<IProps> = ({
	onLoad,
	state,
	toggleMenu,
	loading,
	onChange,
	onSubmit,
	callback,
	getUserProfile,
	driversState,
	requestHandle,
	getRide,
	updateRideMutation,
}) => {
	return (
		<Fragment>
			<Container>
				<Helmet>
					<title>Home | Number</title>
				</Helmet>
				<Sidebar
					sidebar={<Menu />}
					open={state.isMenuOpen}
					onSetOpen={toggleMenu}
					styles={{
						sidebar: {
							backgroundColor: "white",
							width: "80%",
							zIndex: "10",
						},
					}}
				>
					{!loading && <MunuButton onClick={toggleMenu}>|||</MunuButton>}
					<LoadScript googleMapsApiKey={MAPS_KEY}>
						<GoogleMap
							zoom={16}
							onLoad={onLoad}
							mapContainerStyle={containerStyle}
							center={{ lat: 46.23, lng: 2.21 }}
						>
							<Marker position={{ lat: 46.23, lng: 2.21 }} icon={{ path: marker_Me }} />
							{state.toLat !== 0 && state.toLng !== 0 && (
								<Marker
									position={{ lat: state.toLat, lng: state.toLng }}
									title={"To Place"}
									animation={window.google.maps.Animation.DROP}
								/>
							)}
							{driversState.map(
								(p) =>
									p.lat !== 0 &&
									p.lng !== 0 && (
										<Marker
											key={p.id}
											position={{ lat: p.lat, lng: p.lng }}
											icon={{ path: marker_driver }}
											title={"driver"}
										/>
									)
							)}
							{state.address !== "" && state.toAddress !== "" && (
								<DirectionsService
									options={{
										destination: { lat: state.toLat, lng: state.toLng },
										origin: { lat: state.lat, lng: state.lng },
										travelMode: state.travelMode,
									}}
									callback={(result) => callback(result)}
								/>
							)}
							{state.price !== 0 && (
								<RequestButton>
									<Button
										onClick={requestHandle}
										disabled={state.price === 0}
										value={`Request Ride ($${state.price})`}
									/>
								</RequestButton>
							)}
							{getUserProfile?.GetMyProfile?.user?.isDriving === true ? null : (
								<Fragment>
									<AddressBar
										value={state.toAddress}
										onBlur={() => null}
										onChange={onChange}
										name={"address"}
									/>
									<ExtendedButton>
										<Button
											value={state.price !== "" ? "Change Address" : "Pick this place"}
											disabled={state.toAddress === ""}
											onClick={onSubmit}
										/>
									</ExtendedButton>
								</Fragment>
							)}
							{state.isDriving === true && (
								<RidePopUp getRide={getRide} updateRideMutation={updateRideMutation} />
							)}
						</GoogleMap>
					</LoadScript>
				</Sidebar>
			</Container>
		</Fragment>
	);
};

export default HomePresenter;
