import { Scope, Promisifiable, ConfigData } from "../others.js";

abstract class BaseConfigEngine {
    public abstract ready: boolean;

    public abstract initialize(scope?: Scope): void; 
    public abstract refreshConfig(): Promisifiable<ConfigData>;
}

export { BaseConfigEngine };