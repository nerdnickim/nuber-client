import React from "react";
import { Helmet } from "react-helmet";
import styled from "src/typed-components";
import AddressBar from "src/Components/AddressBar";

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

interface IProps {
	mapRef: any;
	address: string;
	onBlur: () => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FindAddressPresenter: React.SFC<IProps> = ({
	mapRef,
	address,
	onBlur,
	onChange,
}) => {
	return (
		<div>
			<Helmet>
				<title>Find Address | nuber</title>
			</Helmet>
			<AddressBar value={address} onBlur={onBlur} onChange={onChange} name={"name"} />
			<Center role="img">📍</Center>
			<Map ref={mapRef} />
		</div>
	);
};

export default FindAddressPresenter;
