import { Driver, Scope, DriverReadyError } from "./others";

class Config {
    private scope: Scope;
    protected driver: Driver;

    constructor(scope: Scope, driver: Driver) {
        this.scope = scope;
        this.driver = driver;
    }

    private driverReady(): void {
        if (!this.driver.ready) {
            throw new DriverReadyError(this.driver);
        }
    }

    async getConfig(key: string) {
        this.driverReady();
        return await this.driver.getConfig(key);
    }

    async initialize() {
        await this.driver.initialize(this.scope);
    }
}


export { Config };