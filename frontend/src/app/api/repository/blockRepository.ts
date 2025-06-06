import {
    PROVIDER_DELETE,
    PROVIDER_GET,
    PROVIDER_POST,
    PROVIDER_PUT,
} from "../provider";
import { Store } from "@/app/redux/store";

const getToken = () => Store.getState().auth.value;
import { Blocks } from "@/app/utils/types";

const delay = (): Promise<void> =>
    new Promise((res) => setTimeout(() => res(), 800));

export const readBlocks = async () => {
    await delay();
    const response = await PROVIDER_GET("blocks");
    return response;
};

export const readBlock = async (id: string) => {
    await delay();
    const response = await PROVIDER_GET(`blocks/${id}`, getToken());
    return response;
};

export const readByNoteId = async (id: string) => {
    await delay();
    const response = await PROVIDER_GET(`blocks/noteId/${id}`, getToken());
    return response;
};

export const createBlock = async (data: Blocks) => {
    await delay();
    const response = await PROVIDER_POST("blocks", data, getToken());
    return response;
};

export const updateBlock = async (id: number, data: Blocks) => {
    await delay();
    const response = await PROVIDER_PUT(`blocks/${id}`, data, getToken());
    return response;
};

export const deleteBlock = async (id: number) => {
    await delay();
    const response = await PROVIDER_DELETE(`blocks/${id}`, getToken());
    return response;
};
