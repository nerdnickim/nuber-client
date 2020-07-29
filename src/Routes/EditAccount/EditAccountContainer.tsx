import React from "react";
import EditAccountPresenter from "./EditAccountPresenter";
import useInput from "src/Hooks/useInput";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "./EditAccount.queries";
import { UpdataMyProfile, UpdataMyProfileVariables } from "../../types/api";

const EditAccountContainer = () => {
	const firstName = useInput("");
	const lastName = useInput("");
	const email = useInput("");

	const [editProfile, { loading }] = useMutation<
		UpdataMyProfile,
		UpdataMyProfileVariables
	>(UPDATE_PROFILE, {
		variables: {
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
			profilePhoto: "",
		},
	});

	const onSubmit: React.ChangeEventHandler = async () => {
		await editProfile();
	};

	return (
		<EditAccountPresenter
			firstName={firstName}
			lastName={lastName}
			email={email}
			onSubmit={onSubmit}
			loading={loading}
		/>
	);
};

export default EditAccountContainer;
