import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import Route from "./routes/route";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import "./assets/styles/index.scss";

const httpLink = new HttpLink({ uri: "http://localhost:4000/" });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("tokens");

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Route />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
