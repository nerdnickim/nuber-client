import React from "react";
import EditAccountPresenter from "./EditAccountPresenter";
import useInput from "src/Hooks/useInput";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PROFILE } from "./EditAccount.queries";
import { UpdataMyProfile, UpdataMyProfileVariables, userProfile } from "../../types/api";
import { USER_PROFILE } from "src/Shared.queries";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const EditAccountContainer = () => {
	const history = useHistory();
	const firstName = useInput("");
	const lastName = useInput("");
	const email = useInput("");

	useQuery<userProfile>(USER_PROFILE, {
		fetchPolicy: "cache-and-network",
		onCompleted: (data) => updateFields(data),
	});
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
		refetchQueries: [{ query: USER_PROFILE }],
		onCompleted: (data) => {
			const { UpdataMyProfile } = data;
			if (UpdataMyProfile.ok) {
				toast.success("Profile Updata");
				history.push({
					pathname: "/",
				});
			} else if (UpdataMyProfile.error) {
				toast.error(UpdataMyProfile.error);
			}
		},
	});

	const updateFields = (data) => {
		if (data) {
			const { GetMyProfile } = data;
			if (GetMyProfile) {
				const { user } = GetMyProfile;
				if (user) {
					firstName.setValue(user.firstName);
					lastName.setValue(user.lastName);
					email.setValue(user.email);
				}
			}
		}
	};

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
