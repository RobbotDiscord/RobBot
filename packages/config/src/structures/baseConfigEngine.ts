import { Scope } from "../others";

abstract class BaseConfigEngine {
    public abstract ready: boolean;

    public abstract initialize(scope: Scope): void | Promise<void>; 
    public abstract getConfig(key: string): unknown | Promise<unknown>;
    public abstract refreshConfig(): Record<string, unknown> | Promise<Record<string, unknown>>;
}

export { BaseConfigEngine };