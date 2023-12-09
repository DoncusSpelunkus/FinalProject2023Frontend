import { CreateUserDTO } from "src/entities/User"

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