import React from "react";
import styled from "styled-components";
import Button from "../Button";

const Wrapper = styled.div`
	background-color: white;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 80%;
	height: 60%;
	z-index: 9;
	padding: 20px 10px;
`;

const DataContain = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
`;

const Passenger = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

const PassengerContain = styled.div`
	display: flex;
	align-items: center;
`;

const Title = styled.h3`
	font-weight: 800;
	margin-bottom: 6px;
`;

const Data = styled.span`
	color: ${(props) => props.theme.blueColor};
`;

const Img = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-right: 20px;
`;

export default ({ getRide, updateRideMutation }) => {
	const {
		GetNearbyRide: { ride },
	} = getRide;
	return (
		<Wrapper>
			<DataContain>
				<Title>Pick Up Address</Title>
				<Data>{ride.pickUpAddress}</Data>
			</DataContain>
			<DataContain>
				<Title>Drop Off Address</Title>
				<Data>{ride.dropOffAddress}</Data>
			</DataContain>
			<DataContain>
				<Title>Price</Title>
				<Data>{ride.price}</Data>
			</DataContain>
			<DataContain>
				<Title>Distance</Title>
				<Data>{ride.distance}</Data>
			</DataContain>
			<DataContain>
				<Title>Duration</Title>
				<Data>{ride.duration}</Data>
			</DataContain>
			<Passenger>
				<Title>Passenger:</Title>
				<PassengerContain>
					<Img src={ride.passenger.profilePhoto} />
					<Data>{ride.passenger.fullName}</Data>
				</PassengerContain>
			</Passenger>
			<Button
				onClick={() => updateRideMutation({ variables: { id: ride.id } })}
				value={"Accept Ride"}
			/>
		</Wrapper>
	);
};
