import { ConfigData, /* Promisifiable, Scope */ } from "../others";
import { BaseConfigEngine } from "./baseConfigEngine";

class JSONConfigEngine extends BaseConfigEngine {
    public ready = false;
    private watchPath: string;
    // private data: ConfigData = {};

    constructor(path: string) {
        super();
        this.watchPath = path;
        this.watchPath; // TEMP
    }

    public initialize(): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // const json = import(this.watchPath, { assert: { type: "json" }});
        // this.data = json;
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