import {makeAutoObservable} from 'mobx'

interface IJournal {
    title: string
    description: string
}

class mangaStore {
    _journal: IJournal[] | null = null;

    constructor() {
        this._journal
    }
}

export default mangaStore
