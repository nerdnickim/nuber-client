import React, { useState } from "react";
import HomePresenter from "./HomePresenter";
import { useQuery } from "@apollo/client";
import { USER_PROFILE } from "../../Shared.queries";
import { userProfile } from "../../types/api";

const HomeContainer = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { data, loading } = useQuery<userProfile>(USER_PROFILE);

	console.log(data);

	const toggleMenu = () => {
		setIsMenuOpen((t) => !t);
	};

	return (
		<HomePresenter isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} loading={loading} />
	);
};

export default HomeContainer;
