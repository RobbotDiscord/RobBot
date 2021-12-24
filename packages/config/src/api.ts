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
        return await this.driver.getConfig(key);
    }

    public async refreshConfig() {
        this.driverReady();
        await this.driver.refreshConfig();
    }

    public async initialize() {
        await this.driver.initialize(this.scope);
    }
}


export { ConfigClient };