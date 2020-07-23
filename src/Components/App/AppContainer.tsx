import React from "react";
import { graphql } from "react-apollo";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueris";
const AppContainer = (data) => {
	const { data: dataS } = data;
	return <AppPresenter isLoggedIn={dataS.auth.isLoggedIn} />;
};

export default graphql(IS_LOGGED_IN)(AppContainer);
