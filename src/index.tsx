import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import App from "./Components/App";
import GlobalStyle from "./global-styles";

function IndexA() {
	return (
		<ApolloProvider client={client}>
			<GlobalStyle />
			<App />
		</ApolloProvider>
	);
}

render(<IndexA />, document.getElementById("root"));
