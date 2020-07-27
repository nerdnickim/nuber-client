import React, { useState } from "react";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { useMutation } from "@apollo/client";
import { VERIFY_PHONE } from "./VerifyPhone.queries";
import { verifyPhone, verifyPhoneVariables } from "../../types/api";
import { toast } from "react-toastify";

const VerifyPhoneContainer = (props) => {
	const { location } = props;
	const [verificationKey, setVerificationKey] = useState("");
	const [verifyPhoneMutation, { loading }] = useMutation<
		verifyPhone,
		verifyPhoneVariables
	>(VERIFY_PHONE, {
		variables: {
			key: verificationKey,
			phoneNumber: location?.state?.phone,
		},
		onCompleted: (data) => {
			const { CompletePhoneVerification } = data;

			if (CompletePhoneVerification.ok) {
				console.log(CompletePhoneVerification);
				toast.success("Complete verification!!");
			} else {
				toast.error(CompletePhoneVerification.error);
			}
		},
	});

	if (!props.location.state) {
		props.history.push("/");
	}

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const {
			target: { name, value },
		} = event;
		const character = {
			[name]: value,
		};
		setVerificationKey(value);

		return character;
	};

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async () => {
		await verifyPhoneMutation();
	};

	return (
		<VerifyPhonePresenter
			verificationKey={verificationKey}
			onSubmit={onSubmit}
			onChange={onInputChange}
			loading={loading}
		/>
	);
};

export default VerifyPhoneContainer;
