import BaseService from "./BaseService";
import { Request } from "../tools/Request";

export default class ChangeService extends BaseService {
    
    static actions( key ) {
        return ({
            get:'get_changes',
            set:'set_change',
            delete:'remove_change',
        })[ key ]
    }

    static middleware(action, response){
        return response.map( item => ({...item, rules:[...item.rules, {
            relation:'>',
            deposit:0,
            value_format:false,
            value:0
        }]}))
    }

    static async removeRule(idChange, idRule) {
        const response = await Request(
            process.env.REACT_APP_API_URL,
            'remove_rule',
            process.env.REACT_APP_WP_TOKEN,
            {
                id: idChange,
                index: idRule
            }
        )
        return response.map( item => ({...item, rules:[...item.rules, {
            relation:'>',
            deposit:0,
            value_format:true,
            value:0
        }]}))
    }
    
    static async addRule(idChange, rule) {
        const response = await Request(
            process.env.REACT_APP_API_URL,
            'add_rule',
            process.env.REACT_APP_WP_TOKEN,
            {
                ...rule,
                id:idChange
            }
        )
        return response.map( item => ({...item, rules:[...item.rules, {
            relation:'>',
            deposit:0,
            value_format:true,
            value:0
        }]}))
    }
}