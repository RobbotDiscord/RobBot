import { BaseConfigEngine } from "./baseConfigEngine";
import { parse } from "dotenv";
import { ConfigData } from "../others";

class DotenvConfigEngine extends BaseConfigEngine {
    public ready = false;
    private buffer: Buffer;
    private data: ConfigData = {};

    constructor(buffer: Buffer) {
        super();
        this.buffer = buffer;
    }

    public async initialize(): Promise<void> {
        this.data = parse(this.buffer);
        this.ready = true;
    }

    public async getConfig(key?: string): Promise<unknown> {
        if (key === undefined) {
            return this.data;
        } else {
            return this.data[key];
        }
    }

    public async refreshConfig(): Promise<ConfigData> {
        this.data = parse(this.buffer);
        return this.data;
    }
}

export { DotenvConfigEngine };