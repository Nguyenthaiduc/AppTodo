import { RouterContext } from '../deps.ts'

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



export async function getParams(ctx:RouterContext) {
    const result = ctx.request.body();
    const value = await result.value;

    return {
        ...ctx.params,
        ...value,
    };
}

export function toMap<T extends Id>(data : T[]) : Map<string,T> {
    
    return data.reduce((p,d) => p.set(d.id,d),new Map());

}

export function toMapEmail<T extends {email : string}> (data : T[]) : Map<string,T> {
    
    return data.reduce((p,d) => p.set(d.email,d),new Map())
}


export function fromMap<T extends Id>(data: Map<string,T>) : T[] {
    const arr = [];
    for (let v of data.values()) {
        arr.push(v);
    }
    return arr;
}