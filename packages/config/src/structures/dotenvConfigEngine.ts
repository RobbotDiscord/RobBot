import { BaseConfigEngine } from "./baseConfigEngine.js";
import { parse } from "dotenv";
import { ConfigData } from "../others.js";
import { readFileSync, PathLike } from "node:fs";

type RecursiveStringRecord = { [key: string]: string | RecursiveStringRecord };

class DotenvConfigEngine extends BaseConfigEngine {
    public ready = false;
    private watchPath: PathLike;
    private data: ConfigData = {};

    constructor(path: PathLike) {
        super();
        this.watchPath = path;
    }

    private parseData(obj: { [property: string]: string }): RecursiveStringRecord {
        const result: RecursiveStringRecord = {};

        // For each object path (property key) in the object
        for (const objectPath in obj) {
            // Split path into component parts
            const parts = objectPath.split(".");

            // Create sub-objects along path as needed
            let target = result;
            while (parts.length > 1) {
                const part = parts.shift() as string;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore It just works ok??? See https://tutorial.eyehunts.com/js/javascript-dot-notation-to-object-example-code/
                target = target[part] = target[part] || {};
            }

            // Set value at end of path
            target[parts[0]] = obj[objectPath];
        }

        return result;
    }

    public initialize(): void {
        const result = readFileSync(this.watchPath, {
            flag: "r"
        });
        const parsed = parse(result);

        this.data = this.parseData(parsed);
        this.ready = true;
    }

    public async refreshConfig(): Promise<ConfigData> {
        const result = readFileSync(this.watchPath, {
            flag: "r"
        });
        const parsed = parse(result);

        this.data = this.parseData(parsed);
        return this.data;
    }
}

export default DotenvConfigEngine;