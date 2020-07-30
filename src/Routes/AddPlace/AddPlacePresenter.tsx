import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Header from "src/Components/Header";
import Form from "src/Components/Form";
import Input from "src/Components/Input/Input";
import Button from "src/Components/Button";
import { Link } from "react-router-dom";
import Loading from "src/Components/Loading";
import { MutationFunctionOptions, FetchResult } from "@apollo/client";
import { AddPlace, AddPlaceVariables } from "src/types/api";

const Container = styled.div``;

const ExtendedInput = styled(Input)`
	margin-bottom: 30px;
`;

const ExtendedLink = styled(Link)`
	margin-top: 50px;
	margin-bottom: 20px;
	display: block;
`;

interface IProps {
	name: {
		value: any;
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
		setValue: React.Dispatch<any>;
	};
	address: {
		value: any;
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
		setValue: React.Dispatch<any>;
	};
	loading: boolean;
	pickupAddress: boolean;
	mutation: (
		options?: MutationFunctionOptions<AddPlace, AddPlaceVariables> | undefined
	) => Promise<FetchResult<AddPlace, Record<string, any>>>;
}

const AddPlacePresenter: React.SFC<IProps> = ({
	name,
	address,
	loading,
	mutation,
	pickupAddress,
}) => {
	return (
		<React.Fragment>
			<Helmet>
				<title>Add Place | Nuber</title>
			</Helmet>
			<Header title={"Places"} backTo={"/places"} />
			<Container>
				<Form onSubmitFn={mutation}>
					<ExtendedInput
						placeholder={"Name"}
						type={"text"}
						value={name.value}
						onChange={name.onChange}
						name={"name"}
					/>
					<ExtendedInput
						placeholder={"Address"}
						type={"text"}
						value={address.value}
						onChange={address.onChange}
						name={"address"}
					/>
					<ExtendedLink to={"/find-address"}>Pick place from map</ExtendedLink>
					{pickupAddress && (
						<Button onClick={null} value={loading ? <Loading /> : "Add Place"} />
					)}
				</Form>
			</Container>
		</React.Fragment>
	);
};

export default AddPlacePresenter;
