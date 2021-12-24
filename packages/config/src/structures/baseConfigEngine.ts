import { Scope, Promisifiable, ConfigData, ConfigDataKey } from "../others";

abstract class BaseConfigEngine {
    public abstract ready: boolean;

    public abstract initialize(scope?: Scope): Promisifiable<void>; 
    public abstract getConfig(key: ConfigDataKey): Promisifiable<ConfigData[ConfigDataKey]>;
    public abstract refreshConfig(): Promisifiable<ConfigData>;
}

export { BaseConfigEngine };