import React from "react";
import { Helmet } from "react-helmet";
import styled from "src/typed-components";
import AddressBar from "src/Components/AddressBar";
import Button from "src/Components/Button";

const Map = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 1;
`;

const Center = styled.span`
	position: absolute;
	width: 40px;
	height: 40px;
	z-index: 2;
	font-size: 30px;
	margin: auto;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
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
	mapRef: any;
	address: string;
	onBlur: () => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onPickPlace: () => void;
}

const FindAddressPresenter: React.SFC<IProps> = ({
	mapRef,
	address,
	onBlur,
	onChange,
	onPickPlace,
}) => {
	return (
		<div>
			<Helmet>
				<title>Find Address | nuber</title>
			</Helmet>
			<AddressBar value={address} onBlur={onBlur} onChange={onChange} name={"name"} />
			<ExtendedButton>
				<Button value={"Pick this place"} onClick={onPickPlace} />
			</ExtendedButton>
			<Center role="img">📍</Center>
			<Map ref={mapRef} />
		</div>
	);
};

export default FindAddressPresenter;
