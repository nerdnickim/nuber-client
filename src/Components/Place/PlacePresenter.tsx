import React from "react";
import styled from "styled-components";
import { MutationFunction } from "@apollo/client";
import { EditPlace, EditPlaceVariables } from "src/types/api";

const Place = styled.div`
	margin: 15px 0;
	display: flex;
	align-items: center;
	& i {
		font-size: 12px;
	}
`;

const Container = styled.div`
	margin-left: 10px;
`;

const Name = styled.span`
	display: block;
`;

const Icon = styled.span`
	cursor: pointer;
`;

const Address = styled.span`
	color: ${(props) => props.theme.greyColor};
	font-size: 14px;
`;

interface IProps {
	fav: boolean | undefined;

	name: string | undefined;
	address: string | undefined;
	mutation: MutationFunction<EditPlace, EditPlaceVariables>;
}

const PlacePresenter: React.SFC<IProps> = ({ fav, name, address, mutation }) => (
	<Place>
		<Icon onClick={mutation as any}>{fav ? "★" : "✩"}</Icon>
		<Container>
			<Name>{name}</Name>
			<Address>{address}</Address>
		</Container>
	</Place>
);

export default PlacePresenter;
