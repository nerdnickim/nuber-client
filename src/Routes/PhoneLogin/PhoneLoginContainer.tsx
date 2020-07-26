import React, { useState } from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { PHONE_SIGN_IN } from "./PhoneLoginQueries";

interface IState {
	countryCode: string;
	phoneNumberS: string;
}

interface IMutationInterface {
	phoneNumber: string;
}

interface IData {
	ok: boolean;
	error: string;
}

const PhoneLoginContainer: React.SFC<IState> = () => {
	const [countryCode] = useState("+82");
	const [phoneNumberS] = useState("");
	let phoneNumber = `${countryCode}${phoneNumberS}`;
	const [phoneSigninMutation] = useMutation<
		{ phoneSigninMutation: IData },
		{ phoneNumber: IMutationInterface }
	>(PHONE_SIGN_IN, {
		variables: { phoneNumber: { phoneNumber } },
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
		return character;
	};

	const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(`${countryCode}${phoneNumberS}`);
		if (isValid) {
			console.log(phoneSigninMutation());
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
		/>
	);
};

export default PhoneLoginContainer;
