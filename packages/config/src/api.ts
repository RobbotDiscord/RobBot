import { Driver, Scope, DriverReadyError, ConfigData, ConfigClientInitError } from "./others.js";
import debugModule from "debug";

const log = debugModule("config:log");
log.log = console.log.bind(console);
const error = debugModule("config:error");

class ConfigClient {
    protected driver: Driver;
    public data: ConfigData = {};

    constructor(driver: Driver) {
        this.driver = driver;
    }

    private driverReady(): void {
        if (!this.driver.ready) {
            throw new DriverReadyError(this.driver);
        }
    }

    public async refreshConfig() {
        this.driverReady();
        const result = this.driver.refreshConfig();
        this.data = await result;
    }

    public async initialize(scope: Scope) {
        try {
            this.data = await this.driver.initialize(scope);
        } catch (error) {
            throw new ConfigClientInitError(this.driver, (error as Error).message ?? undefined);
        }
    }
}


export { ConfigClient, log, error };