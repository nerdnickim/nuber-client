import React from "react";
import { Helmet } from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "../../typed-components";
import Menu from "../../Components/Menu";
import AddressBar from "src/Components/AddressBar";
import Button from "src/Components/Button";
import { GoogleMap, LoadScript, Marker, DirectionsService } from "@react-google-maps/api";
import { MAPS_KEY } from "src/keys";
import { marker_Me } from "src/Components/Icons";

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

const containerStyle = {
	width: "100%",
	height: "100%",
};

const HomePresenter = ({
	onLoad,
	state,
	toggleMenu,
	loading,
	onChange,
	onSubmit,
	callback,
}) => {
	return (
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
				<AddressBar
					value={state.toAddress}
					onBlur={() => null}
					onChange={onChange}
					name={"address"}
				/>
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
						{state.address !== "" && state.toAddress !== "" && (
							<DirectionsService
								options={{
									destination: { lat: state.toLat, lng: state.toLng },
									origin: { lat: 46.23, lng: 2.21 },
									travelMode: state.travelMode,
								}}
								callback={callback}
							/>
						)}
					</GoogleMap>
				</LoadScript>
				<ExtendedButton>
					<Button
						value={"Pick this place"}
						disabled={state.toAddress === ""}
						onClick={onSubmit}
					/>
				</ExtendedButton>
			</Sidebar>
		</Container>
	);
};

export default HomePresenter;
