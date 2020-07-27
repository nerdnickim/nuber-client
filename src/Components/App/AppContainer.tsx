import React from "react";

import { ThemeProvider } from "../../typed-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "../../theme";
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "./AppQueris.local";
import AppPresenter from "./AppPresenter";

const AppContainer = () => {
	const { data } = useQuery(IS_LOGGED_IN);
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<AppPresenter isLoggedIn={data.isLoggedIn} />
			</ThemeProvider>
			<ToastContainer draggable={true} position={"bottom-center"} />
		</React.Fragment>
	);
};

export default AppContainer;
