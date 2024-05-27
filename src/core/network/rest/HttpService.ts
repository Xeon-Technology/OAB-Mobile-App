import { BASE_URL } from "../../../constants";
import { debugPrint } from "../../../utils/sytemUtil";
import { IAuthData } from "../../data/models/AuthData";
import Storage from '@react-native-async-storage/async-storage';

export enum PostBodyType {
    JSON = ("application/json") as any,
    FormData = ("multipart/form-data") as any,
}

export interface IHttpService {
    getAsync<T>(url: string, params?: Map<string, string> | null, authData?: IAuthData | undefined, headers?: Headers | null): Promise<T>
    postAsync<T>(url: string, body: any, bodyType: PostBodyType, authData?: IAuthData): Promise<T>;
    patchAsync<T>(wholeResponse: boolean, url: string, body: any, bodyType: PostBodyType, authData?: any, headers?: Headers | null): Promise<T>;
    getHeaders(authData?: IAuthData): Headers;
    setFalseBaseUrl(): Promise<void>;
    isFalseUrl(): boolean;
}

class HttpService implements IHttpService {

    constructor() {
        Storage.getItem("IS_FALSE_URL").then(value => {
            if (value == "TRUE") {
                this.BASE_ENDPOINT = BASE_URL.REST_API_TEST;
                this.IS_FALSE_URL = true;
            }
        })
    }

    BASE_ENDPOINT = BASE_URL.REST_API;
    IS_FALSE_URL = false;

    async setFalseBaseUrl() {
        this.BASE_ENDPOINT = BASE_URL.REST_API_TEST;
        this.IS_FALSE_URL = true;
        await Storage.setItem("IS_FALSE_URL", "TRUE");
    }

    isFalseUrl() {
        return this.IS_FALSE_URL;
    }

    async getAsync<T>(url: string, params?: Map<string, string> | null, authData?: IAuthData | undefined, headers: Headers | null = null,): Promise<T> {

        let qs: string[] = [];
        let headerData = this.getHeaders(authData);

        headers?.forEach((value: any, key: string) => {
            headerData.set(key, value)
        })

        params?.forEach((value, key) => {
            value && qs.push(`${key}=${value}&`)
        })

        let myInit = {
            method: "GET",
            headers: headerData
        }

        let requestUrl = `${this.BASE_ENDPOINT}${url}`;
        if (qs.length > 0) {
            requestUrl += `?${qs.join("")}`
        }

        debugPrint("Get Request To: " + requestUrl);

        const request = new Request(requestUrl, myInit);
        const response = await fetch(request);


        if (!response.ok) {
            debugPrint("Get Request Failed: " + requestUrl);
            throw new Error(await response.text());
        }

        debugPrint("Get Request Success: " + requestUrl + "")


        if (response.headers.get("content-type")?.includes("application/json"))
            return await response.json();

        return await response.text() as T;

    }


    async postAsync<T>(url: string, body: any, bodyType: PostBodyType = PostBodyType.JSON, authData?: IAuthData): Promise<T> {
        debugPrint("POST Request To: " + url)
        const myInit = {
            method: "POST",
            headers: this.getHeaders(authData),
            body: null as any
        };
        if (bodyType === PostBodyType.JSON) {
            myInit.headers.set("Content-Type", bodyType.toString());
            myInit.body = JSON.stringify(body);
        } else if (bodyType === PostBodyType.FormData) {
            myInit.body = body;
        }
        const request = new Request(`${this.BASE_ENDPOINT}${url}`, myInit);
        debugPrint(request)


        try {
            const response = await fetch(request);
            debugPrint(".......... HTTP Service Reponse...........")
            debugPrint(response)
            if (!response.ok) {
                debugPrint("POST Request Failed: " + url)
                throw new Error(await response.text());
            }
            debugPrint("POST Request Success: " + url)
            return response.json();
        } catch (e) {
            debugPrint(e)
            debugPrint("POST Request Failed: " + url)
            return Promise.reject(e);
        }

    }

    async patchAsync<T>(wholeResponse: boolean, url: string, body: any, bodyType: PostBodyType, authData?: any, headers: Headers | null = null): Promise<T> {

        let headerData = this.getHeaders(authData);

        headers?.forEach((value: any, key: string) => {
            headerData.set(key, value)
        })

        const myInit = {
            method: "PATCH",
            headers: headerData,
            body: null as any
        };

        if (bodyType === PostBodyType.JSON) {
            myInit.headers.append("Content-Type", bodyType.toString());
            myInit.body = JSON.stringify(body);
        } else if (bodyType === PostBodyType.FormData) {
            myInit.body = body;
        }

        const request = new Request(`${this.BASE_ENDPOINT}${url}`, myInit);

        try {
            const response: Response = await fetch(request);
            if (!response.ok) {
                throw new Error(await response.text());
            }
            if (wholeResponse) return Promise.resolve(response as any);
            return response.json();
        } catch (e) {
            console.log(e)
            return Promise.reject(e);
        }
    }


    public getHeaders(authData?: IAuthData): Headers {
        const header = new Headers();
        if (authData != null && authData.token != null) {
            header.append("Authorization", `bearer ${authData.token}`);
        }
        header.append("Content-Type", `application/json`);
        header.append('User-Agent', 'v1.0 (com.xeon.lataherbal; build:1 30) b1e6ba27-3372-49a8-8b19-fa3ce333737c');
        header.append('RECAPTCHA-TOKEN', 'A54B10F1-2AB6-4820-A215-64AD1961A477');
        header.append('PACKAGE-ID', 'com.xeon.lataherbal');

        return header;
    }
}

export default new HttpService() as IHttpService;