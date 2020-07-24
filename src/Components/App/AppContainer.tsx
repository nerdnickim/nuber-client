import React from "react";
import { graphql } from "react-apollo";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueris";
import { ThemeProvider } from "../../typed-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "../../theme";

const AppContainer = (data) => {
	const { data: dataS } = data;
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<AppPresenter isLoggedIn={dataS.auth.isLoggedIn} />
			</ThemeProvider>
			<ToastContainer draggable={true} position={"bottom-center"} />
		</React.Fragment>
	);
};

export default graphql(IS_LOGGED_IN)(AppContainer);
