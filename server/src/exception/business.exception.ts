import { HttpException, HttpStatus } from "@nestjs/common";

export class BusinessException extends HttpException {
    constructor(message: string, httpStatus: HttpStatus) {
        super(message, httpStatus);
    }
}