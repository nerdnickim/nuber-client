import { useState } from "react";

export default (defaultValue) => {
	const [value, setValue] = useState(defaultValue);

	const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const {
			target: { value },
		} = e;

		setValue(value);
	};

	return { value, onChange, setValue };
};
