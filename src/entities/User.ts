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
  EmployeeId?: number;
  name: string;
  email: string;
  username?: string;
  role: string;
  password?:string;
}
