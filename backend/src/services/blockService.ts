import * as BlockRepository from '../repositories/blockRepository';
import { Block } from "../model/model";
import CustomError from '../lib/customError';

export const readBlocks = () => {
    return BlockRepository.readBlocks();
}

export const readBlock = (id: number) => {
    return BlockRepository.readBlock(id);
}
export const findByNoteId = (id: number) => {
    return BlockRepository.findByNoteId(id);
}

export const createBlock = async (payload: Block, note_id: number, parent_id: number) => {


    const foundNote = await BlockRepository.findByNoteId(note_id);

    if(!foundNote) throw new CustomError(401, "Note not found");


    return BlockRepository.createBlock(payload, note_id, parent_id);
}

export const updateBlock = (id: number, payload: Block) => {
    return BlockRepository.updateBlock(id, payload);
}

export const deleteBlock = (id: number) => {
    return BlockRepository.deleteBlock(id);
}