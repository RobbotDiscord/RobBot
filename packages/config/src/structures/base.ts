import { Scope } from "../others";

abstract class BaseConfigEngine {
    ready: boolean;

	constructor() {
		this.ready = true;
	}

    abstract initialize(scope: Scope): void | Promise<void>; 
    abstract getConfig(key: string): unknown | Promise<unknown>;

    abstract refreshConfig(): Record<string, unknown> | Promise<Record<string, unknown>>;
}

export { BaseConfigEngine };