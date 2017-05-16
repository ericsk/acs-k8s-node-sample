import * as restify from "restify";
import * as routes from "./routes";

// init the restify server.
const server = restify.createServer({
    "name": "dora-api",
    "version": "0.0.1"
});

// set URL routes.
routes.setRoutes(server);

// start the server.
server.listen( process.env.PORT || 3000, function() {
    console.log("%s listening at %s", server.name, server.url);
});