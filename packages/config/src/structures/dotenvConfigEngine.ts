import { BaseConfigEngine } from "./baseConfigEngine";
import { parse } from "dotenv";
import { ConfigData } from "../others";
import { readFileSync, PathLike } from "node:fs";

class DotenvConfigEngine extends BaseConfigEngine {
    public ready = false;
    private watchPath: PathLike;
    private data: ConfigData = {};

    constructor(path: PathLike) {
        super();
        this.watchPath = path;
    }

    public initialize(): void {
        const result = readFileSync(this.watchPath, {
            flag: "r"
        });
        this.data = parse(result);
        this.ready = true;
    }

    public async refreshConfig(): Promise<ConfigData> {
        const result = readFileSync(this.watchPath, {
            flag: "r"
        });
        this.data = parse(result);
        return this.data;
    }
}

export { DotenvConfigEngine };