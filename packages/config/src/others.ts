import { BaseConfigEngine } from "./structures/baseConfigEngine";
import { IClientOptions } from "cloudstorm/dist/Types";

type Scope = "gateway" | "executor" | "cache" | "manager";

interface Driver extends BaseConfigEngine {}

type Promisifiable<T> = T | Promise<T>;

interface ConfigDataCommon {
    token: string
}

interface ConfigDataGateway extends IClientOptions {}

interface ConfigData {
    common?: ConfigDataCommon;
    gateway?: ConfigDataGateway;
}

class DriverReadyError extends Error {
    constructor(driver: Driver, message = "") {
        // eslint-disable-next-line no-extra-boolean-cast
        super(`An action on the config driver ${driver.constructor.name} was performed but it wasn't ready${!!message ? "\n" + message : ""}`);
        this.name = "DriverReadyError";
    }
}

class ConfigClientInitError extends Error {
    constructor(driver: Driver, message = "") {
        // eslint-disable-next-line no-extra-boolean-cast
        super(`The Config API tried to initialize the driver ${driver.constructor.name} but it produced an error${!!message ? "\n" + message : ""}`);
    }
}

export { Scope, Driver, DriverReadyError, Promisifiable, ConfigData, ConfigClientInitError };