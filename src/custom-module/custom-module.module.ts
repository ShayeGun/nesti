import { Module, DynamicModule, Provider } from '@nestjs/common';
import { CustomModuleService } from './custom-module.service';

@Module({})
export class CustomModule {
  public static forRoot(config: any): DynamicModule {

    const CustomProvider = this.createAsyncOptionsProvider(config);

    return {
      module: CustomModule,
      providers: [
        CustomProvider,
        CustomModuleService
      ],
      exports: [
        CustomProvider,
        CustomModuleService
      ],
      global: true
    };
  }

  private static createAsyncOptionsProvider(optionsAsync: any): Provider {
    if (optionsAsync.useFactory)
      return {
        provide: "TEST",
        useFactory: optionsAsync.useFactory,
        inject: optionsAsync.inject || []
      };

    return {
      provide: "TEST",
      useFactory: () => ({
        data: false
      }),
      inject: optionsAsync.inject || []
    };
  }
}
