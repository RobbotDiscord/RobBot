import { ConfigClient } from "config";
import { Connection, Receiver, ReceiverOptions, Sender, SenderOptions } from "rhea-promise";

class AmqpWrapper extends Connection {
    // private configClient: ConfigClient;

    constructor(configClient: ConfigClient) {
        super(configClient.data.amqp);
        // this.configClient = configClient;
    }

    public async start() {
        await super.open();
    }

    public async initSender(senderOptions: SenderOptions) {
        const sender: Promise<Sender> = super.createSender(senderOptions);

        return await sender;
    }

    public async initReceiver(receiverOptions: ReceiverOptions) {
        const receiver: Promise<Receiver> = super.createReceiver(receiverOptions);

        return await receiver;
    }
}

export { AmqpWrapper };