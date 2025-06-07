import * as blockService from '../../src/services/blockService';
import { readBlocks, readBlock, findByNoteId, createBlock, updateBlock, deleteBlock } from '../../src/controllers/blockController';
import CustomResponse from '../../src/lib/customResponse';
import errorHandler from '../../src/lib/errorHandler';
import { Request, Response } from 'express';

jest.mock('../../src/services/blockService');
jest.mock('../../src/lib/customResponse');
jest.mock('../../src/lib/errorHandler');

describe('Block Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('readBlocks', () => {
    it('should return blocks successfully', async () => {
      const mockBlocks = [{ id: 1, content: 'Block 1' }];
      (blockService.readBlocks as jest.Mock).mockResolvedValue(mockBlocks);

      await readBlocks(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expect.any(CustomResponse));
    });

    it('should handle errors', async () => {
      const mockError = new Error('Something went wrong');
      (blockService.readBlocks as jest.Mock).mockRejectedValue(mockError);

      await readBlocks(mockReq as Request, mockRes as Response);

      expect(errorHandler).toHaveBeenCalledWith(mockError, mockRes);
    });
  });

  describe('readBlock', () => {
    it('should return a block successfully', async () => {
      const mockBlock = { id: 1, content: 'Block 1' };
      mockReq.params = { id: '1' };
      (blockService.readBlock as jest.Mock).mockResolvedValue(mockBlock);

      await readBlock(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expect.any(CustomResponse));
    });

    it('should return 404 if block not found', async () => {
      mockReq.params = { id: '1' };
      (blockService.readBlock as jest.Mock).mockResolvedValue(null);

      await readBlock(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(expect.any(CustomResponse));
    });

    it('should handle errors', async () => {
      const mockError = new Error('Something went wrong');
      mockReq.params = { id: '1' };
      (blockService.readBlock as jest.Mock).mockRejectedValue(mockError);

      await readBlock(mockReq as Request, mockRes as Response);

      expect(errorHandler).toHaveBeenCalledWith(mockError, mockRes);
    });
  });

  describe('createBlock', () => {
    it('should create a block successfully', async () => {
      const mockBlock = { id: 1, content: 'New Block' };
      mockReq.body = { note_id: 1, parent_id: null, order_index: 1, type: 'text', content: 'New Block' };
      (blockService.createBlock as jest.Mock).mockResolvedValue(mockBlock);

      await createBlock(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expect.any(CustomResponse));
    });

    it('should handle errors', async () => {
      const mockError = new Error('Something went wrong');
      mockReq.body = { note_id: 1, parent_id: null, order_index: 1, type: 'text', content: 'New Block' };
      (blockService.createBlock as jest.Mock).mockRejectedValue(mockError);

      await createBlock(mockReq as Request, mockRes as Response);

      expect(errorHandler).toHaveBeenCalledWith(mockError, mockRes);
    });
  });

  describe('updateBlock', () => {
    it('should update a block successfully', async () => {
      const mockBlock = { id: 1, content: 'Updated Block' };
      mockReq.params = { id: '1' };
      mockReq.body = { content: 'Updated Block' };
      (blockService.updateBlock as jest.Mock).mockResolvedValue(mockBlock);

      const mockIo = { emit: jest.fn() };
      mockReq.app = { get: jest.fn().mockReturnValue(mockIo) } as any;

      await updateBlock(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expect.any(CustomResponse));
      expect(mockIo.emit).toHaveBeenCalledWith('block_updated', mockBlock);
    });

    it('should return 404 if block not found', async () => {
      mockReq.params = { id: '1' };
      mockReq.body = { content: 'Updated Block' };
      (blockService.updateBlock as jest.Mock).mockResolvedValue(null);

      await updateBlock(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(expect.any(CustomResponse));
    });

    it('should handle errors', async () => {
      const mockError = new Error('Something went wrong');
      mockReq.params = { id: '1' };
      mockReq.body = { content: 'Updated Block' };
      (blockService.updateBlock as jest.Mock).mockRejectedValue(mockError);

      await updateBlock(mockReq as Request, mockRes as Response);

      expect(errorHandler).toHaveBeenCalledWith(mockError, mockRes);
    });
  });

  describe('deleteBlock', () => {
    it('should delete a block successfully', async () => {
      const mockBlock = { id: 1, content: 'Deleted Block' };
      mockReq.params = { id: '1' };
      (blockService.deleteBlock as jest.Mock).mockResolvedValue(mockBlock);

      await deleteBlock(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expect.any(CustomResponse));
    });

    it('should return 404 if block not found', async () => {
      mockReq.params = { id: '1' };
      (blockService.deleteBlock as jest.Mock).mockResolvedValue(null);

      await deleteBlock(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(expect.any(CustomResponse));
    });

    it('should handle errors', async () => {
      const mockError = new Error('Something went wrong');
      mockReq.params = { id: '1' };
      (blockService.deleteBlock as jest.Mock).mockRejectedValue(mockError);

      await deleteBlock(mockReq as Request, mockRes as Response);

      expect(errorHandler).toHaveBeenCalledWith(mockError, mockRes);
    });
  });
});

