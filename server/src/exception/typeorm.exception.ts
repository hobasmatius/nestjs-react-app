import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { Request, Response } from 'express';

@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: TypeORMError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const httpStatus = response.statusCode;
        const timestamp = new Date().getTime();
        const errorResponse = {
            statusCode: httpStatus,
            message: 'Unable to process your request, please contact our support by providing the Request ID',
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