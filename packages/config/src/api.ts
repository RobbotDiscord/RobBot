import { Driver, Scope, DriverReadyError, ConfigData, ConfigDataKey } from "./others";

class ConfigClient {
    private scope: Scope;
    protected driver: Driver;
    public data: ConfigData = {};

    constructor(scope: Scope, driver: Driver) {
        this.scope = scope;
        this.driver = driver;
    }

    private driverReady(): void {
        if (!this.driver.ready) {
            throw new DriverReadyError(this.driver);
        }
    }

    public async getConfig(key: ConfigDataKey) {
        this.driverReady();
        const result = await this.driver.getConfig(key);
        this.data[key] = result;
        return result;
    }

    public async refreshConfig() {
        this.driverReady();
        const result = this.driver.refreshConfig();
        this.data = await result;
    }

    public async initialize() {
        await this.driver.initialize(this.scope);
    }
}


export { ConfigClient };