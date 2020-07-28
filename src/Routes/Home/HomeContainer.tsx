import React, { useState } from "react";
import HomePresenter from "./HomePresenter";

const HomeContainer = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen((t) => !t);
	};

	return <HomePresenter isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />;
};

export default HomeContainer;
