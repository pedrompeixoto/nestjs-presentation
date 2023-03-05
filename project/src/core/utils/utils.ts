import { Injectable } from '@nestjs/common';

@Injectable()
export class Utils {
    log(msg: string) {
        console.log(msg);
    }
}
