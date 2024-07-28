import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import * as Joi from 'joi'
import { appConfig, appConfigSchema } from 'src/config/app.config'
import { HomeModule } from 'src/modules/home/home.module'
import { validationOptions } from 'src/utils/validation-options'

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 10,
        limit: 15,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      validationSchema: Joi.object({
        ...appConfigSchema,
      }),
    }),
    HomeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(validationOptions),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
