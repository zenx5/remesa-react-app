import { Request } from "../tools/Request";

export default class ChangeService {
    static async get() {
        const response = await Request(
            process.env.REACT_APP_API_URL,
            'get_changes',
            process.env.REACT_APP_WP_TOKEN,
        )
        return response.map( item => ({...item, rules:[...item.rules, {
            relation:'>',
            deposit:0,
            value_format:false,
            value:0
        }]}))
    }

    static async set(price, currencyFrom, currencyTo){
        const response = await Request(
            process.env.REACT_APP_API_URL,
            'set_change',
            process.env.REACT_APP_WP_TOKEN,
            {
                price,
                currency_from: currencyFrom,
                currency_to: currencyTo
            }
        )
        return response.map( item => ({...item, rules:[...item.rules, {
            relation:'>',
            deposit:0,
            value_format:true,
            value:0
        }]}))
    }

    static async delete(id){
        const response = await Request(
            process.env.REACT_APP_API_URL,
            'remove_change',
            process.env.REACT_APP_WP_TOKEN,
            {
                id
            }
        )
        return response.map( item => ({...item, rules:[...item.rules, {
            relation:'>',
            deposit:0,
            value_format:true,
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