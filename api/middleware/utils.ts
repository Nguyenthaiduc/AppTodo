import { RouterContext,Status } from '../deps.ts'

type Id = {
    id : string
}
type ErrorArgs = Error | string;
type ErrorType = {
    error: {
        message: string,
        stack?: string,
    }
}

export function createErrorBody(error: ErrorArgs):ErrorType {
    const err = formatError(error);
    return {
        error: {
            message: err.message,
            stack: err.stack,
        }
    }
}

function formatError(error: ErrorArgs) : Error {
    if(error instanceof Error) {
        return error;
    }
    return new Error(error);
}

//handle Error
export function handleError(ctx : RouterContext,error : Error) {
    ctx.response.status = Status.BadGateway; //status(403)
    ctx.response.body = createErrorBody(error);
}

//handle OK
export function handleOk(ctx:RouterContext,data : any):void {
    ctx.response.status = Status.OK; //status(200)
    ctx.response.body = { data }
}

export async function getParams(ctx:RouterContext) {
    const result = ctx.request.body();
    const value = await result.value;

    return {
        ...ctx.params,
        ...value,
    };
}

export function toMap<T extends Id>(data : T[]) : Map<string,T> {
    
    return data.reduce((p,d) => p.set(d.id,d),new Map())

}

export function fromMap<T extends Id>(data: Map<string,T>) : T[] {
    const arr = [];
    for (let v of data.values()) {
        arr.push(v);
    }
    return arr;
}