import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import client from "./apollo";
import App from "./Components/App";
import GlobalStyle from "./global-styles";

ReactDOM.render(
	<ApolloProvider client={client}>
		<GlobalStyle />
		<App />
	</ApolloProvider>,
	document.getElementById("root") as HTMLElement
);
