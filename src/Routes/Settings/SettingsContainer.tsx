import React from "react";
import SettingsPresenter from "./SettingsPresenter";
import { useMutation, useQuery } from "@apollo/client";
import { LOG_USER_OUT } from "src/SharedQueirs.local";
import { USER_PROFILE } from "src/Shared.queries";

const SettingsContainer = () => {
	const [logOutMutation] = useMutation(LOG_USER_OUT);
	const { data, loading } = useQuery(USER_PROFILE);
	return (
		<SettingsPresenter userData={data} loading={loading} logUserOut={logOutMutation} />
	);
};

export default SettingsContainer;
