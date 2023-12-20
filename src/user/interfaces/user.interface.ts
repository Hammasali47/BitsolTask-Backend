import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: String,
  addresses: Array<{
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
  }>;
  role: string;
  phoneNo: string;
}
