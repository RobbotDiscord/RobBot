import { BaseConfigEngine } from "./structures/baseConfigEngine.js";
import { Scope, ConfigData, Driver } from "./others.js";
import DotenvConfigEngine  from "./structures/dotenvConfigEngine.js";
import { ConfigClient } from "./api.js";

export {
    BaseConfigEngine,
    Scope,
    ConfigData,
    Driver,
    DotenvConfigEngine,
    ConfigClient
};

// export default exports as typeof import("./index.js"); // According to PapiOphidian: THIS ACTUALLY WORKS AND IS FUCKING CURSED