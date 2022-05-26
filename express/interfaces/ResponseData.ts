class ResponseBase {
   readonly result : boolean;
   readonly message : string;

   constructor(result : boolean, message : string) {
       this.result = result;
       this.message = message;
   }
}
// Response Data
export class ResponseData extends ResponseBase {
    data?: string;
    constructor(message : string, data?: any){
        super(true,message);
        this.data = data;
    }
}
// Response User
export class ResponseUser extends ResponseBase {
    data?: any;
    token?: string | undefined;
    constructor(message : string, data?: any,token?: string | undefined){
        super(true,message);
        this.data = data;
        this.token = token;

    }
}
// Response Error
export class ResponseError extends ResponseBase {
    error?: unknown;
    constructor(message : string, error?: unknown){
        super(false,message);
        this.error = error;
    }
}