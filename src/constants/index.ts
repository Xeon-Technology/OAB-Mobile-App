export { default as mocks } from './mocks';
export { THEME as light } from './light';;
import Constants from 'expo-constants';

const apiUrl = Constants?.expoConfig!?.extra!?.apiUrl?.trim();
const apiUrlFalse = Constants?.expoConfig?.extra?.apiUrlFalse?.trim();

export const BASE_URL = {
    GRAPHQL: apiUrl + '/graphql',
    GRAPHQL_TEST: apiUrlFalse + '/graphql',
    REST_API: apiUrl,
    REST_API_TEST: apiUrlFalse,
};

export const API_ENDPOINT = {
    LOGIN: '/api/authorization',
    ACCOUNTS: '/api/accounts',
    XEON_PDF_GEN_SERVER: 'https://pdf-gen.xeonsoftware.com/generate/pdf',
    ERROR_REPORTING: "/api/error",
    REGISTER_DEVICE: "/api/utils/device-register",

};
