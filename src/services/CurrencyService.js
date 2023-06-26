import BaseService from "./BaseService";

export default class CurrencyService extends BaseService {

    static actions( key ) {
        return ({
            get:'get_currencies',
            set:'set_currency',
            delete:'remove_currency',
        })[ key ]
    }

}