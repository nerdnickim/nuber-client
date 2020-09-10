import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { IS_LOGGED_IN } from "./Components/App/AppQueris.local";

const cache = new InMemoryCache();

cache.writeQuery({
	query: IS_LOGGED_IN,
	data: {
		isLoggedIn: Boolean(localStorage.getItem("jwt")),
	},
});

const httpLink = new HttpLink({
	uri: "http://localhost:4000/graphql",
});

const wsLink = new WebSocketLink({
	uri: "ws://localhost:4000/subscription",
	options: {
		reconnect: true,
	},
});

const authMiddleware = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			"x-jwt": localStorage.getItem("jwt") || "",
		},
	};
});

const client = new ApolloClient({
	cache,
	resolvers: {
		Mutation: {
			logUserIn: (_, { token }) => {
				localStorage.setItem("jwt", token);
				cache.writeQuery({
					query: IS_LOGGED_IN,
					data: {
						__typename: "Auth",
						isLoggedIn: true,
					},
				});
				return null;
			},
			logUserOut: (_, __) => {
				localStorage.removeItem("jwt");
				cache.writeQuery({
					query: IS_LOGGED_IN,
					data: {
						__typename: "Auth",
						isLoggedIn: false,
					},
				});
				return null;
			},
		},
	},
	link: ApolloLink.from([
		authMiddleware,
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.map(({ message, locations, path }) =>
					console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
					)
				);
			if (networkError) console.log(`[Network error]: ${networkError}`);
		}),
		split(
			({ query }) => {
				const definition = getMainDefinition(query);
				return (
					definition.kind === "OperationDefinition" &&
					definition.operation === "subscription"
				);
			},
			wsLink,
			httpLink
		),
	]),
});

export default client;
