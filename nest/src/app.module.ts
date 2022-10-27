import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { Transaction } from './modules/transactions/entities/transaction.entity';
import { TenantModule } from './modules/tenant/tenant.module';
//decorator - Javascript - Ecmascript 7

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          dialect: configService.get('DB_CONNECTION'),
          host: configService.get('DB_HOST'),
          port: parseInt(configService.get('DB_PORT').toString()),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          models: [Transaction],
          autoLoadModels: true,
          synchronize: true,
          sync: {
            alter: true,
          },
        };
      },
    }),
    TransactionsModule,
    TenantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
