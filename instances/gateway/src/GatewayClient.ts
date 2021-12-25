import { Client } from "cloudstorm";
import { ConfigClient, DotenvConfigEngine } from "config";

class GatewayClient extends Client {
    constructor(configClient: ConfigClient) {
        configClient.initialize("gateway");
        if (configClient.data["common"]?.token === undefined) {
            throw new Error("Token hasn't been defined");
        }

        super(configClient.data["common"].token, configClient.data.gateway);

        super.on("error", console.error);
    }

    public async start() {
        super.on("event", async (event) => {
            console.log(event);
        });
    }
}

const dotenvConfigEngine = new DotenvConfigEngine("/etc/robbot.env");
const configClient = new ConfigClient(dotenvConfigEngine);
const gatewayClient = new GatewayClient(configClient);

gatewayClient.start();