import { ConfigClient } from "config";
import { Connection, Sender, SenderOptions } from "rhea-promise";

class AmqpWrapper extends Connection {
    private configClient: ConfigClient;

    constructor(configClient: ConfigClient) {
        super(configClient.data.amqp);
        this.configClient = configClient;
    }

    public async start() {
        await super.open();
    }

    public async initSender(senderOptions: SenderOptions) {
        const sender: Sender = await super.createSender(senderOptions);

        return sender;
    }
}

export { AmqpWrapper };