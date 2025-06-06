import {
    PROVIDER_DELETE,
    PROVIDER_GET,
    PROVIDER_POST,
    PROVIDER_PUT,
} from "../provider";
import { getCookie } from "@/app/utils/helper";
import { Blocks } from "@/app/utils/types";

const token = getCookie("token") || "";

const delay = (): Promise<void> =>
    new Promise((res) => setTimeout(() => res(), 800));

export const readBlocks = async () => {
    await delay();
    const response = await PROVIDER_GET("blocks");
    return response;
};

export const readBlock = async (id: string) => {
    await delay();
    const response = await PROVIDER_GET(`blocks/${id}`, token);
    return response;
};

export const readByNoteId = async (id: string) => {
    await delay();
    const response = await PROVIDER_GET(`blocks/noteId/${id}`, token);
    return response;
};

export const createBlock = async (data: Blocks) => {
    await delay();
    const response = await PROVIDER_POST("blocks", data, token);
    return response;
};

export const updateBlock = async (id: number, data: Blocks) => {
    await delay();
    const response = await PROVIDER_PUT(`blocks/${id}`, data, token);
    return response;
};

export const deleteBlock = async (id: number) => {
    await delay();
    const response = await PROVIDER_DELETE(`blocks/${id}`, token);
    return response;
};
