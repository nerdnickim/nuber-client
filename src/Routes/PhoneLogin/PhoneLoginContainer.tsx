import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router-dom";

class PhoneLoginContainer extends React.Component<RouteComponentProps<any>> {
	public render() {
		return <PhoneLoginPresenter />;
	}
}

export default PhoneLoginContainer;
