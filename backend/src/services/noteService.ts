import * as NoteRepository from '../repositories/noteRepository';
import { Note } from '../model/model';

export const readNotes = async () => {
    return await NoteRepository.readNotes();
};
export const readNote = async (id: number) => {
    return await NoteRepository.readNote(id);
};
export const createNote = async (payload: Note, user_id: number) => {
    return await NoteRepository.createNote(payload, user_id);
};
export const updateNote = async (id: number, payload: Note) => {
    return await NoteRepository.updateNote(id, payload);
};
export const deleteNote = async (id: number) => {
    return await NoteRepository.deleteNote(id);
};