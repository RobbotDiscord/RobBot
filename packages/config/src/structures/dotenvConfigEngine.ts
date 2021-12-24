import { BaseConfigEngine } from "./baseConfigEngine";
import { parse } from "dotenv";
import { ConfigData, ConfigDataKey } from "../others";

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

    public async getConfig(key: ConfigDataKey): Promise<ConfigData[ConfigDataKey]> {
        return this.data[key];
    }

    public async refreshConfig(): Promise<ConfigData> {
        this.data = parse(this.buffer);
        return this.data;
    }
}

export { DotenvConfigEngine };