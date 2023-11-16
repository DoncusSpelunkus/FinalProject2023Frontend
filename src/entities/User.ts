export class User{
    name?: string;
    email?: string;
    username?: string;
    role?: string;
    displayName?: string;
    employeeId?: number;
    warehouseId?: number;
}

export class CreateUserDTO {
  name: string;
  email: string;
  username: string;
  role: string;
  password:string;
  warehouseId: number;
}
