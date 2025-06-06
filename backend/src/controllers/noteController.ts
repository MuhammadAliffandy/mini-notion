import * as noteService from '../services/noteService';
import { Request, Response } from 'express';
import CustomResponse from '../lib/customResponse';
import errorHandler from '../lib/errorHandler';

export const readNotes = async (req: Request, res: Response) => {
  
    try {
      const notes = await noteService.readNotes();
  
      res.status(200).json(new CustomResponse("OK", "Notes fetched successfully", notes));
      return;
    } catch (err: Error | any) {
      errorHandler(err, res);
    }
  }

export const readNote = async (req: Request, res: Response) => {
    const noteId = parseInt(req.params.id);
  
    try {
      const note = await noteService.readNote(noteId);
  
      if (!note) {
        res.status(404).json(new CustomResponse("FAIL", "Note not found"));
        return;
      }
  
      res.status(200).json(new CustomResponse("OK", "Note fetched successfully", note));
      return;
    } catch (err: Error | any) {
      errorHandler(err, res);
    }
  }


export const createNote = async (req: Request, res:Response) => {
    const payload = req.body;
    const user_id = res.locals.user.id;
  
    try {
      
      const notes = await noteService.createNote(  payload , user_id);
  
      res.status(201).json(new CustomResponse("OK", `Note created successfully` , notes ));
      return 
    } catch (err: Error | any ) {
      errorHandler( err,res )
    }
  }


export const updateNote = async (req: Request, res: Response) => {
    const noteId = parseInt(req.params.id);
    const payload = req.body;
  
    try {
      const updatedNote = await noteService.updateNote(noteId, payload);
  
      if (!updatedNote) {
        res.status(404).json(new CustomResponse("FAIL", "Note not found"));
        return 
      }
  
      res.status(200).json(new CustomResponse("OK", "Note updated successfully", updatedNote));
      return 
    } catch (err: Error | any) {
      errorHandler(err, res);
    }
  }

export const deleteNote = async (req: Request, res: Response) => {
    const noteId = parseInt(req.params.id);
  
    try {
      const deletedNote = await noteService.deleteNote(noteId);
  
      if (!deletedNote) {
        res.status(404).json(new CustomResponse("FAIL", "Note not found"));
        return ;
      }
  
      res.status(200).json(new CustomResponse("OK", "Note deleted successfully"));
      return 
    } catch (err: Error | any) {
      errorHandler(err, res);
    }
  }
