import { Injectable,UnauthorizedException,Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @Inject(getModelToken('User')) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(user: User): Promise<User> {
    console.log("user",user)
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = new this.userModel({ ...user, password: hashedPassword });
    return createdUser.save();
  }

  async validateUser(email: string, password: string): Promise<string | null> {
    const user = await this.userModel.findOne({ email }).exec();

    if (user && (await bcrypt.compare(password, user.password))) {
      // User validated, generate JWT token
      const payload = { userId: user._id, email: user.email }; // Customize payload as needed
      const token = this.jwtService.sign(payload);

      return token;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async remove(id: string): Promise<User | null> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    return deletedUser ? (deletedUser as any) : null;
  }
  
  
  
}
