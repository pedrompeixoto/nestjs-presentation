import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

export type ErrorCodesStatusMapping = {
  [key: string]: number;
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    private errorCodesStatusMapping: ErrorCodesStatusMapping = {
        P2000: HttpStatus.BAD_REQUEST,
        P2002: HttpStatus.CONFLICT,
        P2025: HttpStatus.NOT_FOUND,
    };

    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const statusCode = this.errorCodesStatusMapping[exception.code];

        if (exception instanceof Prisma.NotFoundError) {
            return super.catch(new HttpException({ success: false, message: exception.message, statusCode }, statusCode), host);
        }

        if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
                return super.catch(exception, host);
            }

            return super.catch(new HttpException({ success: false, message: exception.message, statusCode }, statusCode), host);
        }

        return super.catch(exception, host);
    }
}
