import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/config/constants';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { EnvConfig } from 'src/config/interfaces/envconfig.interface';
import { ConfigModuleOptions } from 'src/config/interfaces/config-module-options.interface';

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(@Inject(CONFIG_OPTIONS) options: ConfigModuleOptions) {
        const filePath = `${process.env.NODE_ENV || 'development'}.env`;
        const envFile = path.resolve(__dirname, '../../../../', options.folder, filePath);
        this.envConfig = dotenv.parse(fs.readFileSync(envFile));
        dotenv.config({ path: envFile });
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}
