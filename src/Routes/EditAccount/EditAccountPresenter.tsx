import React from "react";
import styled from "styled-components";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import { Helmet } from "react-helmet";
import Header from "../../Components/Header";
import Button from "../../Components/Button";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
	padding: 0px 40px;
`;

const ExtendedInput = styled(Input)``;

interface IProps {
	firstName: {
		value: any;
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
		setValue: React.Dispatch<any>;
	};
	lastName: {
		value: any;
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
		setValue: React.Dispatch<any>;
	};
	email: {
		value: any;
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
		setValue: React.Dispatch<any>;
	};

	onSubmit: (event: React.ChangeEvent<Element>) => void;
	loading: boolean;
}

const EditAccountPresenter: React.SFC<IProps> = ({ firstName, lastName, email }) => {
	return (
		<Container>
			<Helmet>
				<title>Edit Account | Number</title>
			</Helmet>
			<Header title={"Edit Account"} backTo={"/"} />
			<ExtendedForm onSubmitFn={null}>
				<ExtendedInput
					onChange={firstName.onChange}
					type={"text"}
					value={firstName.value}
					placeholder={"First Name"}
				/>
				<ExtendedInput
					onChange={lastName.onChange}
					type={"text"}
					value={lastName.value}
					placeholder={"Last Name"}
				/>
				<ExtendedInput
					onChange={email.onChange}
					type={"text"}
					value={email.value}
					placeholder={"Email"}
				/>
				<Button onClick={null} value={"UPDATE"} />
			</ExtendedForm>
		</Container>
	);
};

export default EditAccountPresenter;
