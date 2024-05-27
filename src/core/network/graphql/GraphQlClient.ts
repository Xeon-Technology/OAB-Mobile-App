import {
    ApolloClient, ApolloLink,
    InMemoryCache, createHttpLink, DefaultOptions
} from "@apollo/client";

import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import Storage from '@react-native-async-storage/async-storage';
import { BASE_URL as URL } from "../../../constants/index"
import { debugPrint } from "../../../utils/sytemUtil";
import { IAuthData } from "../../data/models/AuthData";
import HttpService from "../rest/HttpService";

const cache = new InMemoryCache({
    typePolicies: {
        Container: {
            merge: true,
        },
    }
});

const httpLink = createHttpLink({
    uri: URL.GRAPHQL,
});

const testHttpLink = createHttpLink({
    uri: URL.GRAPHQL_TEST,
});


const logoutLink = onError(({ networkError, graphQLErrors, operation }) => {
    debugPrint("GaphQL Network Errors: ")
    networkError && debugPrint(networkError)
    graphQLErrors && debugPrint(graphQLErrors)
    operation && debugPrint(operation)
    // response && debugPrint(response)
})

const authLink = setContext(async (req, { headers }) => {

    const auth = await Storage.getItem('authData');
    const authData = JSON.parse(auth as string) as IAuthData
    return {
        headers: {
            ...headers,
            authorization: authData ? `Bearer ${authData.token}` : "",
            "Content-Type": "application/json",
            "User-Agent": "v1.0 (com.xeon.lataherbal; build:1 30) b1e6ba27-3372-49a8-8b19-fa3ce333737c",
            "RECAPTCHA-TOKEN": "A54B10F1-2AB6-4820-A215-64AD1961A477",
            "PACKAGE-ID": "com.xeon.lataherbal"
        }
    }
});

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}


export const client = new ApolloClient({
    cache: cache,
    link: logoutLink.concat(authLink.concat(ApolloLink.split(sp => HttpService.isFalseUrl(), testHttpLink, httpLink))),
    defaultOptions
})
// Initialize Apollo client