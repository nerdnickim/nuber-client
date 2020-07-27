import React, { useState } from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { PHONE_SIGN_IN } from "./PhoneLogin.queries";
import { PhoneVerificationVariables, PhoneVerification } from "../../types/api";

interface IState {
	countryCode: string;
	phoneNumberS: string;
}

const PhoneLoginContainer: React.SFC<IState> = () => {
	const [countryCode] = useState("+82");
	const [phoneNumberS, setPhoneNumberS] = useState("");

	const [phoneSigninMutation, { loading }] = useMutation<
		PhoneVerification,
		PhoneVerificationVariables
	>(PHONE_SIGN_IN, {
		variables: { phoneNumber: `${countryCode}${phoneNumberS}` },
		onCompleted: (data) => {
			const { PhoneVerification } = data;
			if (PhoneVerification.ok) {
				return;
			} else {
				toast.error(PhoneVerification.error);
			}
		},
	});

	const onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (
		event
	) => {
		const {
			target: { name, value },
		} = event;
		const character = {
			[name]: value,
		};
		setPhoneNumberS(value);

		return character;
	};

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(`${countryCode}${phoneNumberS}`);
		console.log(isValid, `${countryCode}${phoneNumberS}`);
		if (isValid) {
			await phoneSigninMutation();
		} else {
			toast.error("Please write a valid phone number");
		}
	};

	return (
		<PhoneLoginPresenter
			countryCode={countryCode}
			phoneNumber={phoneNumberS}
			onInputChange={onInputChange}
			onSubmit={onSubmit}
			loading={loading}
		/>
	);
};

export default PhoneLoginContainer;
