import * as blockService from '../services/blockService';
import { Request, Response } from 'express';
import CustomResponse from '../lib/customResponse';
import errorHandler from '../lib/errorHandler';

export const readBlocks = async (req: Request, res: Response) => {
  try {
    const blocks = await blockService.readBlocks();
    res.status(200).json(new CustomResponse("OK", "Blocks fetched successfully", blocks));
    return;
  } catch (err: Error | any) {
    errorHandler(err, res);
  }
};

export const readBlock = async (req: Request, res: Response) => {
  const blockId = parseInt(req.params.id);

  try {
    const block = await blockService.readBlock(blockId);

    if (!block) {
      res.status(404).json(new CustomResponse("FAIL", "Block not found"));
      return;
    }

    res.status(200).json(new CustomResponse("OK", "Block fetched successfully", block));
    return ;
  } catch (err: Error | any) {
    errorHandler(err, res);
  }
}

export const findByNoteId = async (req: Request, res: Response) => {
  const noteId = parseInt(req.params.id);

  try {
    const blocks = await blockService.findByNoteId(noteId);

    if (!blocks) {
      res.status(404).json(new CustomResponse("FAIL", "No blocks found for this note"));
      return;
    }

    res.status(200).json(new CustomResponse("OK", "Blocks fetched successfully", blocks));
    return ;
  } catch (err: Error | any) {
    errorHandler(err, res);
  }
}

export const createBlock = async (req: Request, res: Response) => { 
  const { note_id, parent_id , order_index, type , content } = req.body;
 

  try {
    const payload = {
      content : content,
      order_index : order_index,
      type : type,
  };

    const block = await blockService.createBlock(payload , note_id , parent_id );
    res.status(200).json(new CustomResponse("OK", "Block created successfully" , block));
    return 
  } catch (err: Error | any) {
    errorHandler(err, res);
  }
}

export const updateBlock = async (req: Request, res: Response) => {
  const blockId = parseInt(req.params.id);
  const payload = req.body;

  try {
    const updatedBlock = await blockService.updateBlock(blockId, payload);

    if (!updatedBlock) {
      res.status(404).json(new CustomResponse("FAIL", "Block not found"));
      return;
    }

    const io = req.app.get('io');
    io.emit("block_updated", updatedBlock);

    res
      .status(200)
      .json(
        new CustomResponse("OK", "Block updated successfully", updatedBlock)
      );
  } catch (err: Error | any) {
    errorHandler(err, res);
  }
};

export const deleteBlock = async (req: Request, res: Response) => {
    const blockId = parseInt(req.params.id);
    
    try {
        const deletedBlock = await blockService.deleteBlock(blockId);
    
        if (!deletedBlock) {
          res.status(404).json(new CustomResponse("FAIL", "Block not found"));
          return 
        }
    
        res.status(200).json(new CustomResponse("OK", "Block deleted successfully", deletedBlock));
        return
    } catch (err: Error | any) {
        errorHandler(err, res);
    }
    }
