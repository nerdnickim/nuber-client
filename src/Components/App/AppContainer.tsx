import React from "react";
import { graphql } from "react-apollo";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueris";
import { ThemeProvider } from "../../typed-components";
import theme from "../../theme";

// tslint:disable-next-line
const GlobalStyle = createGlobalStyle`
	${reset}
`;

const AppContainer = (data) => {
	const { data: dataS } = data;
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<AppPresenter isLoggedIn={dataS.auth.isLoggedIn} />
		</ThemeProvider>
	);
};

export default graphql(IS_LOGGED_IN)(AppContainer);
