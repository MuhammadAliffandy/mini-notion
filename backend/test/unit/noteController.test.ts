// noteController.test.ts
import * as noteController from '../../src/controllers/noteController';
import * as noteService from '../../src/services/noteService';
import CustomResponse from '../../src/lib/customResponse';

jest.mock('../../src/services/noteService');

describe('noteController', () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: { user: { id: 1 } },
    };
    jest.clearAllMocks();
  });

  describe('readNotes', () => {
    it('should return notes successfully', async () => {
      const mockNotes = [{ id: 1, title: 'Note 1' }];
      (noteService.readNotes as jest.Mock).mockResolvedValue(mockNotes);

      await noteController.readNotes(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        new CustomResponse('OK', 'Notes fetched successfully', mockNotes)
      );
    });

    it('should handle errors', async () => {
      const mockError = new Error('Database error');
      (noteService.readNotes as jest.Mock).mockRejectedValue(mockError);

      await noteController.readNotes(req, res);

      expect(res.status).not.toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('readNote', () => {
    it('should return a note successfully', async () => {
      const mockNote = { id: 1, title: 'Note 1' };
      req.params.id = '1';
      (noteService.readNote as jest.Mock).mockResolvedValue(mockNote);

      await noteController.readNote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        new CustomResponse('OK', 'Note fetched successfully', mockNote)
      );
    });

    it('should return 404 if note not found', async () => {
      req.params.id = '1';
      (noteService.readNote as jest.Mock).mockResolvedValue(null);

      await noteController.readNote(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        new CustomResponse('FAIL', 'Note not found')
      );
    });

    it('should handle errors', async () => {
      const mockError = new Error('Database error');
      req.params.id = '1';
      (noteService.readNote as jest.Mock).mockRejectedValue(mockError);

      await noteController.readNote(req, res);

      expect(res.status).not.toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('createNote', () => {
    it('should create a note successfully', async () => {
      const mockNote = { id: 1, title: 'New Note' };
      req.body = { title: 'New Note' };
      (noteService.createNote as jest.Mock).mockResolvedValue(mockNote);

      await noteController.createNote(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        new CustomResponse('OK', 'Note created successfully', mockNote)
      );
    });

    it('should handle errors', async () => {
      const mockError = new Error('Database error');
      req.body = { title: 'New Note' };
      (noteService.createNote as jest.Mock).mockRejectedValue(mockError);

      await noteController.createNote(req, res);

      expect(res.status).not.toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('updateNote', () => {
    it('should update a note successfully', async () => {
      const mockNote = { id: 1, title: 'Updated Note' };
      req.params.id = '1';
      req.body = { title: 'Updated Note' };
      (noteService.updateNote as jest.Mock).mockResolvedValue(mockNote);

      await noteController.updateNote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        new CustomResponse('OK', 'Note updated successfully', mockNote)
      );
    });

    it('should return 404 if note not found', async () => {
      req.params.id = '1';
      req.body = { title: 'Updated Note' };
      (noteService.updateNote as jest.Mock).mockResolvedValue(null);

      await noteController.updateNote(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        new CustomResponse('FAIL', 'Note not found')
      );
    });

    it('should handle errors', async () => {
      const mockError = new Error('Database error');
      req.params.id = '1';
      req.body = { title: 'Updated Note' };
      (noteService.updateNote as jest.Mock).mockRejectedValue(mockError);

      await noteController.updateNote(req, res);

      expect(res.status).not.toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('deleteNote', () => {
    it('should delete a note successfully', async () => {
      req.params.id = '1';
      (noteService.deleteNote as jest.Mock).mockResolvedValue(true);

      await noteController.deleteNote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        new CustomResponse('OK', 'Note deleted successfully')
      );
    });

    it('should return 404 if note not found', async () => {
      req.params.id = '1';
      (noteService.deleteNote as jest.Mock).mockResolvedValue(false);

      await noteController.deleteNote(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        new CustomResponse('FAIL', 'Note not found')
      );
    });

    it('should handle errors', async () => {
      const mockError = new Error('Database error');
      req.params.id = '1';
      (noteService.deleteNote as jest.Mock).mockRejectedValue(mockError);

      await noteController.deleteNote(req, res);

      expect(res.status).not.toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });
  });
});