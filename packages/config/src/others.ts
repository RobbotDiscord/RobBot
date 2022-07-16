import { BaseConfigEngine } from "./structures/baseConfigEngine.js";
import { IClientOptions } from "cloudstorm/dist/Types.js";
import { ConnectionOptions } from "rhea-promise";

enum Scope {
    MANAGER = "manager",
    EXECUTOR = "executor",
    CACHE = "cache",
    GATEWAY = "gateway",
}

interface Driver extends BaseConfigEngine {}

type Promisifiable<T> = T | Promise<T>;

interface ConfigDataCommon {
    token: string
}
interface ConfigDataGateway extends IClientOptions {}
interface ConfigDataAMQP extends ConnectionOptions {}

interface ConfigData {
    common?: ConfigDataCommon;
    gateway?: ConfigDataGateway;
    amqp?: ConfigDataAMQP
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
        super(`The Config API tried to initialize the driver ${driver.constructor.name} but it produced the following error${!!message ? "\n" + message : ""}`);
    }
}

export { Scope, Driver, DriverReadyError, Promisifiable, ConfigData, ConfigClientInitError };