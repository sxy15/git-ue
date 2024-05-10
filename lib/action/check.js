var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getConfig } from "../util.js";
import { log } from "../log.js";
import { execa } from "execa";
export function check() {
    return __awaiter(this, void 0, void 0, function* () {
        const { config, current } = yield getConfig();
        if (!current || !config[current]) {
            return;
        }
        const { remote = [] } = config[current];
        const aliases = [];
        const { stdout: remoteStdout } = yield execa `git remote -v`;
        const _remote = remoteStdout.split('\n')[1].split('\t')[1].split(' ')[0];
        for (const alias in config) {
            const { remote = [] } = config[alias];
            if (remote.includes(_remote)) {
                aliases.push(alias);
            }
        }
        if (!remote.includes(_remote)) {
            log.error(`current alias: ${current}`);
            log.info('your bind: ');
            log.table(aliases);
            process.exit(1);
        }
    });
}
