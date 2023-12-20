import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

const UserModel: any = getModelToken('User');
@Module({
  controllers: [UserController],
  providers: [UserService, { provide: getModelToken('User'), useValue: UserModel }],
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    // ... other imports
  ],
})
export class UserModule {}
