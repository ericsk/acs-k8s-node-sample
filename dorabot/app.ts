import * as builder from "botbuilder";
import * as restify from "restify";
import * as dialogs from "./dialogs";

// create REST server.
const server = restify.createServer({
    name: "Dora Indexer Bot",
    version: "0.0.1"
});
server.listen( process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, (session: builder.Session) => {
    session.replaceDialog("HelpDialog");
});

// setup dialogs...

bot.dialog("RecognizePicture", dialogs.RecognizeDialog)
    .triggerAction({ matches: [ /Recognize/i ]});

bot.dialog("RelationshipChecking", dialogs.RelationshipDialog)
    .triggerAction({ matches: /relationships/i });

bot.dialog("HelpDialog", dialogs.HelpDialog)
    .triggerAction({ matches: /help/i });