import * as builder from "botbuilder";
import * as request from "request";
import * as rp from "request-promise-native";

const CUSTOMVISION_URL = 'CUSTOMVISION_TRAINED_PREDICTION_URL';
const PREDICTION_KEY = 'CUSTOMVISION_TRAINED_PREDICTION_KEY';

/**
 * The data structure of the returned prediction.
 */
interface IPrediction {
    TagId: string,
    Tag: string,
    Probability: number
}

export let HelpDialog: builder.IDialogWaterfallStep = (session: builder.Session) => {
    let card = new builder.HeroCard(session)
        .title("May I help you?")
        .buttons([
            builder.CardAction.imBack(session, "Recognize a pic", "Recognize"),
            builder.CardAction.imBack(session, "Check relationships", "Relationship")
        ]);
    let msg = new builder.Message(session)
        .addAttachment(card)
        .inputHint(builder.InputHint.acceptingInput);

    session.send(msg).endDialog();
}


// The recognition dialog.
export let RecognizeDialog: builder.IDialogWaterfallStep[] = [
    (session: builder.Session) => {
        builder.Prompts.attachment(session, "Please upload the picture.");
    },
    (session: builder.Session, results: builder.IPromptAttachmentResult) => {
        console.log(`Attachments: ${results.response}.`);
        
        for (let i in results.response) {
            let attachment: builder.IAttachment = results.response[i];
            let reqOpt: request.Options = {
                uri: CUSTOMVISION_URL,
                headers: {
                    'Prediction-Key': PREDICTION_KEY,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: {
                    // FIXME: not work in local emulator
                    "Url": attachment.contentUrl
                },
                json: true
            };
            rp(reqOpt)
                .then((parsedBody: any) => {
                    let preds: IPrediction[] = parsedBody.Predictions;
                    let tags: string[] = [];
                    for (let i in preds) {
                        let pred = preds[i];
                        if (pred.Probability > 0.5) {
                            tags.push(pred.Tag);
                        }
                    }
                    session.send(`Objects in the picture are: ${tags.join(',')}`);
                })
                .catch((err: any) => {
                    console.error(err);
                });
        }
        session.endDialog();
    }
];

// The relationship checking dialog.
export let RelationshipDialog: builder.IDialogWaterfallStep[] = [
    (session: builder.Session) => {
        session.send('Not implemented yet.').endDialog();
    }
];