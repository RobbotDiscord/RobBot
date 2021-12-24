import { Scope, Promisifiable, ConfigData } from "../others";

abstract class BaseConfigEngine {
    public abstract ready: boolean;

    public abstract initialize(scope?: Scope): Promisifiable<void>; 
    public abstract getConfig(key: string): Promisifiable<unknown>;
    public abstract refreshConfig(): Promisifiable<ConfigData>;
}

export { BaseConfigEngine };