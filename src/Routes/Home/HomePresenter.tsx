import React from "react";
import { Helmet } from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "../../typed-components";
import Menu from "../../Components/Menu";

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

const Map = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: -1;
`;

interface IProps {
	state: {
		lat: number;
		lng: number;
		isMenuOpen: boolean;
		map: any;
		userMarker: any;
	};
	toggleMenu: () => void;
	loading: boolean;
	mapRef: any;
}

const HomePresenter: React.SFC<IProps> = ({ state, toggleMenu, loading, mapRef }) => (
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
		</Sidebar>
		<Map ref={mapRef} />
	</Container>
);

export default HomePresenter;
