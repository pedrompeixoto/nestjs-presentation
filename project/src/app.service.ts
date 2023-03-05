import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/services/config/config.service';

@Injectable()
export class AppService {

    constructor(private configService: ConfigService) { }

    getHello(): string {
        return this.configService.get("HELLO_MESSAGE");
    }
}
