import React from "react";
import { graphql } from "react-apollo";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueris";
import { ThemeProvider } from "../../typed-components";
import theme from "../../theme";

const AppContainer = (data) => {
	const { data: dataS } = data;
	return (
		<ThemeProvider theme={theme}>
			<AppPresenter isLoggedIn={dataS.auth.isLoggedIn} />
		</ThemeProvider>
	);
};

export default graphql(IS_LOGGED_IN)(AppContainer);
