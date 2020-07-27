import React from "react";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { RouteComponentProps } from "react-router-dom";

interface IState {
	key: string;
}

interface IProps extends RouteComponentProps<any> {}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
	public state = {
		key: "",
	};
	constructor(props: IProps) {
		super(props);
		if (!props.location.state) {
			props.history.push("/");
		}
	}

	public onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const {
			target: { name, value },
		} = event;
		const character = {
			[name]: value,
		};

		return character;
	};
	render() {
		const { key } = this.state;
		return <VerifyPhonePresenter key={key} onChange={this.onInputChange} />;
	}
}

export default VerifyPhoneContainer;
