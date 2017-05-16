import * as botbuilder from "botbuilder";
import * as restify from "restify";

// create REST server.
const server = restify.createServer({
    name: "Dora Indexer Bot",
    version: "0.0.1"
});
server.listen( process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new botbuilder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', connector.listen());

var bot = new botbuilder.UniversalBot(connector, function(session) {
    session.send("You said: %s", session.message.text);
});