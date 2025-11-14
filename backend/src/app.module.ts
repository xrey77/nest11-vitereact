// import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity'
import { Product } from './products/entities/product.entity';
import {TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

// import { MulterModule } from '@nestjs/platform-express';
// import { multerConfig } from './utils/multer.config'; // Import the config
import { AuthService } from './auth/auth.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    // MulterModule.register(multerConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Path to your static files directory
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule, UsersModule
      ],      
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return {
          type: 'mysql',
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [User, Product],
          synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
        }
      },
      inject: [ConfigService],      
    }),
    ProductsModule,
    // JwtModule.register({
    //   global: true,
    //   secret: configService.get<string>('DATABASE_HOST'),
    //   signOptions: { expiresIn: '1h' },
    // }),      
    // JwtModule.registerAsync({
    //   imports: [ConfigModule], // Import ConfigModule here if not global
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET'), // Fetch secret from .env
    //     signOptions: {
    //       expiresIn: configService.get<string>('JWT_EXPIRATION_TIME') || '1h',
    //     },
    //     global: true, // Optional: make JwtService globally available
    //   }),
    //   inject: [ConfigService], // Inject the ConfigService
    // }),

  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}


// TypeOrmModule.forRootAsync({
//   imports: [ConfigModule, UsersModule],
//   useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
//     return {
//       type: 'mysql', // Must be an explicit string literal, e.g., 'postgres', 'mysql', 'mariadb'
//       host: configService.get<string>('DATABASE_HOST'),
//       port: configService.get<number>('DATABASE_PORT'),
//       username: configService.get<string>('DATABASE_USERNAME'),
//       password: configService.get<string>('DATABASE_PASSWORD'),
//       database: configService.get<string>('DATABASE_NAME'),
//       entities: [User],
//       synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
//     }
//   },
//   inject: [ConfigService],      
// })