class CustomError extends Error {
    code: string | number;
  
    constructor(code: string | number, message: string) {
      super(message);
      this.code = code;

      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }
  
  export default CustomError;