import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from 'src/config/services/config/config.service';

@Injectable()
export class Utils {
    constructor(private configService: ConfigService) {}

    log(msg: string) {
        console.log(msg);
    }

    async hash(value: string): Promise<string> {
        const rounds = this.configService.get("SALT_ROUNDS");
        return await bcrypt.hash(value, Number(rounds));
    }

    validateHash(hash: string, valueToCompare: string): Promise<boolean> {
        return bcrypt.compare(valueToCompare, hash);
    }
}
