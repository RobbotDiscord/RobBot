import { ConfigClient } from "config";
import { Connection, ReceiverOptions, SenderOptions, ConnectionEvents, SenderEvents, ReceiverEvents } from "rhea-promise";
import debugModule from "debug";

const log = debugModule("amqp-wrapper:log");
log.log = console.log.bind(console);
const logConnection = log.extend("connection");
const logSender = log.extend("sender");
const logReceiver = log.extend("receiver");
const error = debugModule("amqp-wrapper:error");
const errorConnection = error.extend("connection");
const errorSender = error.extend("sender");
const errorReceiver = error.extend("receiver");
debugModule.enable("amqp-wrapper:error:*");

class AmqpWrapperConnection extends Connection {
    // private configClient: ConfigClient;

    constructor(configClient: ConfigClient) {
        super(configClient.data.amqp);
        // this.configClient = configClient;

        super.on(ConnectionEvents.connectionError, async (context) => {
            errorConnection("Connection error\n%j", context.error ?? {"message": "No error obj provided"});
        });

        super.on(ConnectionEvents.connectionClose, async () => {
            logConnection("Connection closed");
        });
    }

    public async start() {
        await super.open();
    }

    public async initSender(senderOptions: SenderOptions) {
        const sender = await super.createSender(senderOptions);

        sender.on(SenderEvents.senderError, async (context) => {
            errorSender("Sender error\n%j", context.error ?? {"message": "No error obj provided"});
        });
        sender.on(SenderEvents.senderClose, async () => {
            logSender("Sender closed: %s", sender.name);
        });

        return sender;
    }

    public async initReceiver(receiverOptions: ReceiverOptions) {
        const receiver = await super.createReceiver(receiverOptions);

        receiver.on(ReceiverEvents.receiverError, async (context) => {
            errorReceiver("Receiver error\n%j", context.error ?? {"message": "No error obj provided"});
        });
        receiver.on(ReceiverEvents.receiverClose, async () => {
            logReceiver("Receiver closed: %s", receiver.name);
        });

        return receiver;
    }
}

export { AmqpWrapperConnection };