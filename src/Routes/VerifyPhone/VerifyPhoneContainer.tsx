import React from "react";
import VerifyPhonePresenter from "./VerifyPhonePresenter";

const VerifyPhoneContainer: React.ComponentState = (props) => {
	console.log(props);
	//eslint-disable
	if (!props.location.state) {
		props.history.push("/");
	}
	return <VerifyPhonePresenter />;
};

export default VerifyPhoneContainer;
