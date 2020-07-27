import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloLink,
	concat,
} from "@apollo/client";
import { IS_LOGGED_IN } from "./Components/App/AppQueris.local";

const cache = new InMemoryCache();

cache.writeQuery({
	query: IS_LOGGED_IN,
	data: {
		isLoggedIn: Boolean(localStorage.getItem("jwt")),
	},
});

const httpLink = createHttpLink({
	uri: "http://localhost:4000/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
	operation.setContext(({ headers }) => ({
		headers: {
			...headers,
			"x-jwt": localStorage.getItem("jwt") || "",
		},
	}));

	return forward(operation);
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
	link: concat(authMiddleware, httpLink),
});

export default client;
