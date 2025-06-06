class CustomResponse {
    status: string;
    message: string;
    data: object | null;
  
    constructor(status: string, message: string, data: object | null = null) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
}
  
export default CustomResponse;