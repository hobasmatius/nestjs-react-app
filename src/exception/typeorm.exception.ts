import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { Request, Response } from 'express';

@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: TypeORMError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        const timestamp = new Date().getTime();
        const errorResponse = {
            statusCode: httpStatus.toString(),
            message: 'Unable to process your request',
            requestId: timestamp.toString()
        }

        Logger.error(
            exception.message,
            exception.stack,
            `${timestamp} ${request.method} ${request.url} ${JSON.stringify(request.params)} ${JSON.stringify(request.query)} ${JSON.stringify(request.body)}`
        );
        
        response.status(httpStatus).json(errorResponse);
    }
}