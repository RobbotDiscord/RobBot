import { ConfigData, /* Promisifiable, Scope */ } from "../others.js";
import { BaseConfigEngine } from "./baseConfigEngine.js";

class JSONConfigEngine extends BaseConfigEngine {
    public ready = false;
    private watchPath: string;
    // private data: ConfigData = {};

    constructor(path: string) {
        super();
        this.watchPath = path;
        this.watchPath; // TEMP
    }

    public async initialize(): Promise<ConfigData> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // const json = import(this.watchPath, { assert: { type: "json" }});
        // this.data = json;
        return {};
    }

    public async refreshConfig(): Promise<ConfigData> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // const json = import(this.watchPath, { assert: { type: "json" }});
        // this.data = json;
        return {};
    }
}

export default JSONConfigEngine;