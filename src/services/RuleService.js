import BaseService from "./BaseService";

export default class RuleService extends BaseService  {

    static actions( key ) {
        return ({
            set:'add_rule',
            delete:'remove_rule'
        })[ key ]
    }

    static middleware(action, response){
        return response.map( item => ({...item, rules:[...item.rules, {
            relation:'>',
            deposit:0,
            value_format:true,
            value:0
        }]}))
    }

}