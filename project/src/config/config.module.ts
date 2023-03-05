import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from './constants';
import { ConfigModuleOptions } from './interfaces/config-module-options.interface';
import { ConfigService } from './services/config/config.service';

@Module({
    providers: [ConfigService]
})
export class ConfigModule {
    static register(options: ConfigModuleOptions): DynamicModule {
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                ConfigService,
            ],
            exports: [ConfigService],
        };
    }
}
