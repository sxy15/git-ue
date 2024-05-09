var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getConfig, setConfig } from "../util.js";
import { log } from "../log.js";
import { execa } from "execa";
export function bind(alias) {
    return __awaiter(this, void 0, void 0, function* () {
        const { config } = yield getConfig();
        if (!config[alias]) {
            log.error(`alias: ${alias} not exists`);
            return;
        }
        const { remote = [] } = config[alias];
        const { stdout: nameStdout } = yield execa `git remote -v`;
        const _remote = nameStdout.split('\n')[1].split('\t')[1].split(' ')[0];
        if (!remote.includes(_remote)) {
            remote.push(_remote);
        }
        config[alias].remote = remote;
        yield setConfig(config);
        log.success(`bind alias: ${alias} success`);
    });
}
