import { ConfigClient } from "config";
import { Connection, ReceiverOptions, SenderOptions, ConnectionEvents, SenderEvents, ReceiverEvents } from "rhea-promise";
import debugModule from "debug";

const log = debugModule("amqp-wrapper:log");
log.log = console.log.bind(console); // Bind to stdout instead of stderr
const logConnection = log.extend("connection");
const logSender = log.extend("sender");
const logReceiver = log.extend("receiver");
const error = debugModule("amqp-wrapper:error");
const errorConnection = error.extend("connection");
const errorSender = error.extend("sender");
const errorReceiver = error.extend("receiver");
debugModule.enable("amqp-wrapper:error");
debugModule.enable("amqp-wrapper:error:*");

class AmqpWrapperConnection {
    // private configClient: ConfigClient;
    private _connection: Connection;

    constructor(configClient: ConfigClient) {
        this._connection = new Connection(configClient.data.amqp);

        this._connection.on(ConnectionEvents.connectionError, async (context) => {
            errorConnection("Connection error\n%j", context.error ?? {"message": "No error obj provided"});
        });

        this._connection.on(ConnectionEvents.connectionClose, async () => {
            logConnection("Connection closed");
        });
    }

    public get connection(): Connection {
        return this._connection;
    }

    public async start() {
        await this._connection.open();
    }

    public async initSender(senderOptions: SenderOptions) {
        const sender = await this._connection.createSender(senderOptions);

        sender.on(SenderEvents.senderError, async (context) => {
            errorSender("Sender error\n%j", context.error ?? {"message": "No error obj provided"});
        });
        sender.on(SenderEvents.senderClose, async () => {
            logSender("Sender closed: %s", sender.name);
        });

        return sender;
    }

    public async initReceiver(receiverOptions: ReceiverOptions) {
        const receiver = await this._connection.createReceiver(receiverOptions);

        receiver.on(ReceiverEvents.receiverError, async (context) => {
            errorReceiver("Receiver error\n%j", context.error ?? {"message": "No error obj provided"});
        });
        receiver.on(ReceiverEvents.receiverClose, async () => {
            logReceiver("Receiver closed: %s", receiver.name);
        });

        return receiver;
    }
}

export { AmqpWrapperConnection, log, error };