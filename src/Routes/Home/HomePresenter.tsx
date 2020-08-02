import React from "react";
import { Helmet } from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "../../typed-components";
import Menu from "../../Components/Menu";
import AddressBar from "src/Components/AddressBar";
import Button from "src/Components/Button";

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

interface IProps {
	state: {
		lat: number;
		lng: number;
		isMenuOpen: boolean;
		address: string;
		toLat: number;
		toLng: number;
	};
	toggleMenu: () => void;
	loading: boolean;
	mapRef: any;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: () => Promise<void>;
}

const HomePresenter: React.SFC<IProps> = ({
	state,
	toggleMenu,
	loading,
	mapRef,
	onChange,
	onSubmit,
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
					value={state.address}
					onBlur={() => null}
					onChange={onChange}
					name={"address"}
				/>
				{!loading && <MunuButton onClick={toggleMenu}>|||</MunuButton>}
				<Map ref={mapRef} />
				<ExtendedButton>
					<Button
						value={"Pick this place"}
						disabled={state.address === ""}
						onClick={onSubmit}
					/>
				</ExtendedButton>
			</Sidebar>
		</Container>
	);
};

export default HomePresenter;
