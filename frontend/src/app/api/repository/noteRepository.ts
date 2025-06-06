import {
    PROVIDER_DELETE,
    PROVIDER_GET,
    PROVIDER_POST,
    PROVIDER_PUT,
} from "../provider";

import { Notes } from "@/app/utils/types";

import { Store } from "@/app/redux/store";

const getToken = () => Store.getState().auth.value;

const delay = (): Promise<void> =>
    new Promise((res) => setTimeout(() => res(), 800));

export const readNotes = async () => {
    await delay();
    const response = await PROVIDER_GET("notes", getToken());
    return response;
};

export const readNote = async (id: string) => {
    await delay();
    const response = await PROVIDER_GET(`notes/${id}`, getToken());
    return response;
};

export const createNote = async (data: Notes) => {
    await delay();
    const response = await PROVIDER_POST("notes", data, getToken());
    return response;
};

export const updateNote = async (id: number, data: Notes) => {
    await delay();
    const response = await PROVIDER_PUT(`notes/${id}`, data, getToken());
    return response;
};

export const deleteNote = async (id: number) => {
    await delay();
    const response = await PROVIDER_DELETE(`notes/${id}`, getToken());
    return response;
};
