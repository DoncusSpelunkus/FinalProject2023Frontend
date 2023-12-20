import { ChangePasswordDTO } from "src/entities/PasswordConfirmation"

export class getMe {
    static readonly type = '[User] Get me'
    constructor() { }
}

export class Login {
    static readonly type = '[User] Login'
    constructor(public username: string, public password: string) { }
}

export class ClearUser {
    static readonly type = '[Log] Clear user'
    constructor() { }
}

export class getUserConnection {
    static readonly type = '[User] Get user connection'
    constructor(public token: string) { }
}

export class changePassword {
    static readonly type = '[User] Establish connection'
    constructor(public dto: ChangePasswordDTO) { }
}