import { ChangePasswordDTO } from "src/entities/ChangePasswordDTO"
import { CreateUserDTO } from "src/entities/User"
import {SupportEmail} from "../../../entities/SupportEmail";

export class getUsers {
    static readonly type = '[UserManagement] Get users'
    constructor() { }
}

export class createUser {
    static readonly type = '[UserManagement] Create user'
    constructor(public payload: CreateUserDTO) { }
}

export class updateUser {
    static readonly type = '[UserManagement] Update user'
    constructor(public payload: CreateUserDTO) { }
}

export class deleteUser {
    static readonly type = '[UserManagement] Delete user'
    constructor(public payload: number) { }
}

export class resetUserPassword {
    static readonly type = '[User] Reset Password'
    constructor(public email: string) { }
}

export class contactSupport {
  static readonly type = '[User] Contact Support'
  constructor(public dto: SupportEmail) { }
}
