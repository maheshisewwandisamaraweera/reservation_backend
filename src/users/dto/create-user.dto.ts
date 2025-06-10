export class CreateUserDto {
  username: string;
  password: string;
  address: string;
  email: string;
  businessName?: string;
  businessType?: string;
  contactNumber: string;
  role: string;
}
