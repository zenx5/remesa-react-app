import { Request } from "../tools/Request";

export default class BaseService {
    static actions( key ) {
        return ({})[ key ]
    }

    static middleware(action, response){
        return response || []
    }

    static async get() {
        const response = await Request(
            process.env.REACT_APP_API_URL,
            this.actions('get'),
            process.env.REACT_APP_WP_TOKEN,
        )
        return this.middleware('get', response)
    }

    static async set(data){
        const response = await Request(
            process.env.REACT_APP_API_URL,
            this.actions('set'),
            process.env.REACT_APP_WP_TOKEN,
            data
        )
        return this.middleware('set', response)
    }

    static async delete(data){
        const response = await Request(
            process.env.REACT_APP_API_URL,
            this.actions('delete'),
            process.env.REACT_APP_WP_TOKEN,
            data
        )
        return this.middleware('delete', response)
    }

    static async wpaction(action, data){
        const response = await Request(
            process.env.REACT_APP_API_URL,
            this.actions(action),
            process.env.REACT_APP_WP_TOKEN,
            data
        )
        return this.middleware(action, response)
    }
}