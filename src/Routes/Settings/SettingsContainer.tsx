import React from "react";
import SettingsPresenter from "./SettingsPresenter";
import { useMutation, useQuery } from "@apollo/client";
import { LOG_USER_OUT } from "src/SharedQueirs.local";
import { USER_PROFILE, GET_PLACES } from "src/Shared.queries";
import { userProfile, GetMyPlaces } from "src/types/api";

const SettingsContainer = () => {
	const [logOutMutation] = useMutation(LOG_USER_OUT);
	const { data, loading } = useQuery<userProfile>(USER_PROFILE);
	const { data: placeData, loading: placeLoading } = useQuery<GetMyPlaces>(GET_PLACES);

	return (
		<SettingsPresenter
			userData={data}
			placeData={placeData}
			loading={loading}
			placeLoading={placeLoading}
			logUserOut={logOutMutation}
		/>
	);
};

export default SettingsContainer;
