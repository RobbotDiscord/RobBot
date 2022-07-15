import { BaseConfigEngine } from "./structures/baseConfigEngine";
import { Scope, ConfigData, Driver } from "./others";
import DotenvConfigEngine  from "./structures/dotenvConfigEngine";
import { ConfigClient } from "./api";

export {
    BaseConfigEngine,
    Scope,
    ConfigData,
    Driver,
    DotenvConfigEngine,
    ConfigClient
};

export default exports as typeof import("./index"); // According to PapiOphidian: THIS ACTUALLY WORKS AND IS FUCKING CURSED