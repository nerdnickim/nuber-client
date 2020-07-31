import React from "react";
import { Helmet } from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "../../typed-components";
import Menu from "../../Components/Menu";

const Container = styled.div``;

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
			{!loading && <button onClick={toggleMenu}>Open sidebar</button>}
		</Sidebar>
		<Map ref={mapRef} />
	</Container>
);

export default HomePresenter;
