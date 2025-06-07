// userController.test.ts
import { Request, Response } from 'express';
import * as userService from '../../src/services/userService';
import * as userController from '../../src/controllers/userController';
import CustomResponse from '../../src/lib/customResponse';

jest.mock('../../src/services/userService');
jest.mock('../../src/lib/customResponse');

describe('User Controller', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn(() => ({ json: jsonMock }));
        mockRequest = {};
        mockResponse = {
            status: statusMock,
            json: jsonMock,
            clearCookie: jest.fn(),
            sendStatus: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('registerHandler', () => {
        it('should return 400 if required fields are missing', async () => {
            mockRequest.body = {};
            await userController.registerHandler(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith(expect.any(CustomResponse));
        });

        it('should return 200 if registration is successful', async () => {
            const mockUser = { name: 'John Doe' };
            (userService.register as jest.Mock).mockResolvedValue(mockUser);

            mockRequest.body = { name: 'John', email: 'john@example.com', password: 'password' };
            await userController.registerHandler(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(expect.any(CustomResponse));
        });
    });

    describe('loginHandler', () => {
        it('should return 400 if email or password is missing', async () => {
            mockRequest.body = {};
            await userController.loginHandler(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith(expect.any(CustomResponse));
        });

        it('should return 401 if credentials are invalid', async () => {
            (userService.login as jest.Mock).mockResolvedValue(null);

            mockRequest.body = { email: 'john@example.com', password: 'wrongpassword' };
            await userController.loginHandler(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(401);
            expect(jsonMock).toHaveBeenCalledWith(expect.any(CustomResponse));
        });

        it('should return 200 if login is successful', async () => {
            const mockToken = 'mockToken';
            (userService.login as jest.Mock).mockResolvedValue(mockToken);

            mockRequest.body = { email: 'john@example.com', password: 'password' };
            await userController.loginHandler(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(expect.any(CustomResponse));
        });
    });

    describe('logoutHandler', () => {
        it('should return 204 if no token is provided', () => {
            mockRequest.cookies = {};
            userController.logoutHandler(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
        });

        it('should clear the token cookie and return 200', () => {
            mockRequest.cookies = { token: 'mockToken' };
            userController.logoutHandler(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.clearCookie).toHaveBeenCalledWith('token', { httpOnly: true });
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(expect.any(CustomResponse));
        });
    });

    describe('findUserByEmail', () => {
        it('should return 404 if user is not found', async () => {
            (userService.findByEmail as jest.Mock).mockResolvedValue(null);

            mockRequest.body = { email: 'notfound@example.com' };
            await userController.findUserByEmail(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith(expect.any(CustomResponse));
        });

        it('should return 200 if user is found', async () => {
            const mockUser = { email: 'john@example.com' };
            (userService.findByEmail as jest.Mock).mockResolvedValue(mockUser);

            mockRequest.body = { email: 'john@example.com' };
            await userController.findUserByEmail(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(expect.any(CustomResponse));
        });
    });

    describe('findUserById', () => {
        it('should return 404 if user is not found', async () => {
            (userService.findById as jest.Mock).mockResolvedValue(null);

            mockResponse.locals = { user: { id: '123' } };
            await userController.findUserById(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith(expect.any(CustomResponse));
        });

        it('should return 200 if user is found', async () => {
            const mockUser = { id: '123', name: 'John Doe' };
            (userService.findById as jest.Mock).mockResolvedValue(mockUser);

            mockResponse.locals = { user: { id: '123' } };
            await userController.findUserById(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(expect.any(CustomResponse));
        });
    });

    describe('forgotPassword', () => {
        it('should return 400 if email or password is missing', async () => {
            mockRequest.body = {};
            await userController.forgotPassword(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith(expect.any(CustomResponse));
        });

        it('should return 200 if password is updated successfully', async () => {
            const mockUser = { email: 'john@example.com' };
            (userService.forgotPassword as jest.Mock).mockResolvedValue(mockUser);

            mockRequest.body = { email: 'john@example.com', password: 'newpassword' };
            await userController.forgotPassword(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(expect.any(CustomResponse));
        });
    });
});