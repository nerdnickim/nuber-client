import React from "react";

interface IProps {
	onSubmitFn: any;
	className?: string;
}

const Form: React.SFC<IProps> = ({ onSubmitFn, className, children }) => (
	<form
		className={className}
		onSubmit={(e) => {
			e.preventDefault();
			onSubmitFn();
		}}
	>
		{children}
	</form>
);

export default Form;
