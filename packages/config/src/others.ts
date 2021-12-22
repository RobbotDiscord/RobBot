import { BaseConfigEngine } from "./structures/base";

type Scope = "gateway" | "executor" | "cache" | "manager";

interface Driver extends BaseConfigEngine {};

class DriverReadyError extends Error {
    constructor(driver: Driver, message = "") {
        super(`An action on the config driver ${driver.constructor.name} was performed but it wasn't ready${!!message ? "\n" + message : ""}`);
        this.name = "DriverReadyError";
    }
}

export { Scope, Driver, DriverReadyError };