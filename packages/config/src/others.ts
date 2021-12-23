import { BaseConfigEngine } from "./structures/baseConfigEngine";

type Scope = "gateway" | "executor" | "cache" | "manager";

interface Driver extends BaseConfigEngine {}

type Promisifiable<T> = T | Promise<T>;

interface ConfigData {
    [key: string]: string;
}

class DriverReadyError extends Error {
    constructor(driver: Driver, message = "") {
        // eslint-disable-next-line no-extra-boolean-cast
        super(`An action on the config driver ${driver.constructor.name} was performed but it wasn't ready${!!message ? "\n" + message : ""}`);
        this.name = "DriverReadyError";
    }
}

export { Scope, Driver, DriverReadyError, Promisifiable, ConfigData };