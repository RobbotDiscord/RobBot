import { ConfigData, Scope } from "../others";
import { BaseConfigEngine } from "./baseConfigEngine";
import { PathLike, readFileSync } from "node:fs";

class JSONConfigEngine extends BaseConfigEngine {
    public ready = false;
    private watchPath: PathLike;
    private data: ConfigData = {};

    constructor(path: PathLike) {
        super();
        this.watchPath = path;
    }

    public initialize(scope?: Scope): void {
        const json = import(this.watchPath, { assert: { type: "json" }})
    }
}