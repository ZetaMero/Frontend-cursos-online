import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import { ApolloProvider } from "react-apollo";
import * as serviceWorker from "./serviceWorker";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("Graphql Errors", graphQLErrors);
  }

  if (networkError) {
    console.log("network Errors", networkError);
  }
});

const uri = "http://localhost:3002/graphql";
const link = ApolloLink.from([errorLink, createHttpLink({ uri })]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />,
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
