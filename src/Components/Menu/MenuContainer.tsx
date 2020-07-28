import React from "react";
import MenuPresenter from "./MenuPresenter";
import { useQuery } from "@apollo/client";
import { USER_PROFILE } from "../../Shared.queries";
import { userProfile } from "../../types/api";

const MenuContainer = () => {
	const { data, loading } = useQuery<userProfile>(USER_PROFILE);
	return <MenuPresenter data={data} loading={loading} />;
};

export default MenuContainer;
