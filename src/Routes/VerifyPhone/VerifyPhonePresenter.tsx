import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import Form from "../../Components/Form";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
	padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
	margin-bottom: 20px;
`;

interface IProps {
	verificationKey: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	loading: boolean;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const VerifyPhonePresenter: React.SFC<IProps> = ({
	verificationKey,
	onChange,
	onSubmit,
}) => (
	<Container>
		<Helmet>
			<title>Verify Phone | Number</title>
		</Helmet>
		<Header backTo={"/phone-login"} title={"Verify Phone Number"} />
		<ExtendedForm onSubmitFn={onSubmit}>
			<ExtendedInput
				value={verificationKey}
				placeholder={"Enter Verification Code"}
				onChange={onChange}
			/>
			<Button value={"Submit"} onClick={null} />
		</ExtendedForm>
	</Container>
);

export default VerifyPhonePresenter;
