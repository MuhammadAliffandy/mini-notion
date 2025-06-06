import { Users } from "@/app/utils/types";
import {
    PROVIDER_DELETE,
    PROVIDER_GET,
    PROVIDER_POST,
    PROVIDER_PUT,
} from "../provider";

import { getCookie } from "@/app/utils/helper";
const token = getCookie("token") || "";

const delay = (): Promise<void> =>
    new Promise((res) => setTimeout(() => res(), 800));

export const login = async (data: Users) => {
    await delay();
    const response = await PROVIDER_POST("auth/login", data);
    return response;
};

export const register = async (data: Users) => {
    await delay();
    const response = await PROVIDER_POST("auth/register", data);
    return response;
};

export const logout = async () => {
    await delay();
    const response = await PROVIDER_GET("auth/logout", "", true);
    return response;
};

export const getUser = async () => {
    await delay();
    const response = await PROVIDER_GET(`user`, token);
    return response;
};
