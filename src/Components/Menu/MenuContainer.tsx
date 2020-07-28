import React from "react";
import MenuPresenter from "./MenuPresenter";
import { useQuery, useMutation } from "@apollo/client";
import { USER_PROFILE } from "../../Shared.queries";
import { userProfile } from "../../types/api";
import { TOGGLE_DRIVING } from "./Menu.queries";
import { toggleDriving } from "../../types/api";

const MenuContainer = () => {
	const { data, loading } = useQuery<userProfile>(USER_PROFILE);
	const [toggleDrivingMutation] = useMutation<toggleDriving>(TOGGLE_DRIVING, {
		refetchQueries: [{ query: USER_PROFILE }],
	});
	return (
		<MenuPresenter data={data} loading={loading} toggleDriving={toggleDrivingMutation} />
	);
};

export default MenuContainer;
