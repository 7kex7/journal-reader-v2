import { makeAutoObservable } from 'mobx'

class userStore {
    _isAuth: boolean = false
    _user: string = ''
    _is_admin: boolean = false
    _burgerOpen: boolean = false

    constructor() {
        this._isAuth
        this._user
        this._is_admin
        this._burgerOpen
        makeAutoObservable(this)
    }

    setIsAuth(bool: boolean) : void {
        this._isAuth = bool
    }

    setUser(user: string) : void {
        this._user = user
    }

    setRole(is_admin: boolean) : void {
        this._is_admin = is_admin
    }

    setBurgerOpen(bool: boolean) : void{
        this._burgerOpen = bool
    }

    get isAuth() : boolean {
        return this._isAuth
    }

    get user() : string {
        return this._user
    }

    get role() : boolean {
        return this._is_admin;
    }

    get burgerOpen() : boolean {
        return this._burgerOpen
    }
}

export default userStore
