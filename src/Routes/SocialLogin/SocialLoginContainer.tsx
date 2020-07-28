import React, { useState } from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { useMutation } from "@apollo/client";
import { FACEBOOK_CONNECT } from "./SocialLogin.queries";
import { toast } from "react-toastify";
import { FaceBookConnect, FaceBookConnectVariables } from "../../types/api";
import { IS_LOGGED_IN } from "../../SharedQueirs.local";

const SocialLoginContainer = () => {
	const [nameS, setNameS] = useState("");
	const [isLoggedInMutation] = useMutation(IS_LOGGED_IN);
	const [facebookConnectMutation, { loading }] = useMutation<
		FaceBookConnect,
		FaceBookConnectVariables
	>(FACEBOOK_CONNECT, {
		onCompleted: (data) => {
			const { FaceBookConnect } = data;
			if (FaceBookConnect.ok) {
				if (FaceBookConnect.token) {
					isLoggedInMutation({ variables: { token: FaceBookConnect.token } });
					toast.success(`Welcome!! ${nameS}`);
				}
			} else {
				toast.error(FaceBookConnect.error);
			}
		},
	});

	const loginCallback = async (response) => {
		const { name, first_name, last_name, email, id, accessToken } = response;
		if (accessToken) {
			setNameS(name);
			await facebookConnectMutation({
				variables: {
					firstName: first_name,
					lastName: last_name,
					email,
					fbId: id,
				},
			});
		} else {
			toast.error("Could not log you in");
		}
	};

	return <SocialLoginPresenter loginCallback={loginCallback} loading={loading} />;
};

export default SocialLoginContainer;
