import axios from "axios";
import React, { useState } from "react";
import EditAccountPresenter from "./EditAccountPresenter";
import useInput from "src/Hooks/useInput";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PROFILE } from "./EditAccount.queries";
import { UpdataMyProfile, UpdataMyProfileVariables, userProfile } from "../../types/api";
import { USER_PROFILE } from "src/Shared.queries";
import { toast } from "react-toastify";

const EditAccountContainer = () => {
	useQuery<userProfile>(USER_PROFILE, {
		onCompleted: (data) => updateFields(data),
	});

	const firstName = useInput("");
	const lastName = useInput("");
	const email = useInput("");
	const profilePhoto = useInput("");
	const [uploading, setUploading] = useState(false);

	const [editProfile, { loading }] = useMutation<
		UpdataMyProfile,
		UpdataMyProfileVariables
	>(UPDATE_PROFILE, {
		variables: {
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
			profilePhoto: profilePhoto.value,
		},
		refetchQueries: [{ query: USER_PROFILE }],
		onCompleted: (data) => {
			const { UpdataMyProfile } = data;
			if (UpdataMyProfile.ok) {
				toast.success("Profile Updata");
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
					profilePhoto.setValue(user.profilePhoto);
				}
			}
		}
	};

	const photoHandle: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
		const {
			target: { files },
		} = e;
		if (files) {
			setUploading((t) => !t);

			const formData = new FormData();
			formData.append("file", files[0]);

			const {
				data: { location },
			} = await axios.post("http://localhost:4000/api/upload", formData, {
				headers: {
					"content-type": "multipart/form-data",
				},
			});
			profilePhoto.setValue(location);
			await editProfile();
			setUploading((t) => !t);
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
			profilePhoto={profilePhoto}
			onSubmit={onSubmit}
			loading={loading}
			uploading={uploading}
			onChange={photoHandle}
		/>
	);
};

export default EditAccountContainer;
