import { BaseConfigEngine } from "./structures/baseConfigEngine";
import { Scope, ConfigData, Driver, DriverReadyError, Promisifiable } from "./others";
import { DotenvConfigEngine } from "./structures/dotenvConfigEngine";
import { Config } from "./api";

export {
    BaseConfigEngine,
    Scope,
    ConfigData,
    Driver,
    DriverReadyError,
    Promisifiable,
    DotenvConfigEngine,
    Config
};

export default exports as typeof import("./index"); // According to PapiOphidian: THIS ACTUALLY WORKS AND IS FUCKING CURSED