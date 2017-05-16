import * as restify from "restify";

export function queryEntity(req: restify.Request, res: restify.Response, next: restify.Next) {
    res.send(200);
    next();
}