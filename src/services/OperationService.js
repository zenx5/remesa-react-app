import BaseService from "./BaseService";

export default class OperationService extends BaseService {
    static actions( key ) {
        return ({
            get:'get_operations',
            set:'set_operation',
            delete:'remove_operation',
        })[ key ]
    }
}