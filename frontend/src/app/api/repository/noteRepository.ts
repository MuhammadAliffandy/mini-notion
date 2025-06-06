import {
    PROVIDER_DELETE,
    PROVIDER_GET,
    PROVIDER_POST,
    PROVIDER_PUT,
} from "../provider";
import { getCookie } from "@/app/utils/helper";
import { Notes } from "@/app/utils/types";

const token = getCookie("token") || "";

const delay = (): Promise<void> =>
    new Promise((res) => setTimeout(() => res(), 800));

export const readNotes = async () => {
    await delay();
    const response = await PROVIDER_GET("notes", token);
    return response;
};

export const readNote = async (id: string) => {
    await delay();
    const response = await PROVIDER_GET(`notes/${id}`, token);
    return response;
};

export const createNote = async (data: Notes) => {
    await delay();
    const response = await PROVIDER_POST("notes", data, token);
    return response;
};

export const updateNote = async (id: number, data: Notes) => {
    await delay();
    const response = await PROVIDER_PUT(`notes/${id}`, data, token);
    return response;
};

export const deleteNote = async (id: number) => {
    await delay();
    const response = await PROVIDER_DELETE(`notes/${id}`, token);
    return response;
};
