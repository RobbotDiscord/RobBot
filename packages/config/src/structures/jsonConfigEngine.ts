import { ConfigData, Scope } from "../others";
import { BaseConfigEngine } from "./baseConfigEngine";
import { PathLike, readFileSync } from "node:fs";

class JSONConfigEngine extends BaseConfigEngine {
    public ready = false;
    private watchPath: string;
    private data: ConfigData = {};

    constructor(path: string) {
        super();
        this.watchPath = path;
    }

    public initialize(scope?: Scope): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const json = import(this.watchPath, { assert: { type: "json" }});
    }
}