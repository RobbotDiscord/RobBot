import { Client } from "cloudstorm";
import { ConfigClient, DotenvConfigEngine } from "config";
import { AmqpWrapperConnection } from "amqp-wrapper";
import debugModule from "debug";

const log = debugModule("gateway:log");
log.log = console.log.bind(console);
const error = debugModule("gateway:error");

class GatewayClient extends Client {
    private amqpWrapper: AmqpWrapperConnection;

    constructor(configClient: ConfigClient, amqpWrapper: AmqpWrapperConnection) {
        configClient.initialize("gateway");
        if (configClient.data["common"]?.token === undefined) {
            throw new Error("Token hasn't been defined");
        }

        super(configClient.data["common"].token, configClient.data.gateway);

        this.amqpWrapper = amqpWrapper;

        super.on("error", error);
    }

    public async start() {
        super.on("event", async (event) => {
            log("%O", event);
        });
    }
}

const dotenvConfigEngine = new DotenvConfigEngine("/etc/robbot.env");
const configClient = new ConfigClient(dotenvConfigEngine);
const amqpWrapper = new AmqpWrapperConnection(configClient);
const gatewayClient = new GatewayClient(configClient, amqpWrapper);

gatewayClient.start();