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
        const { name, email } = config[current];
        const { stdout: nameStdout } = yield execa `git config --get user.name`;
        const { stdout: emailStdout } = yield execa `git config --get user.email`;
        if (name !== nameStdout || email !== emailStdout) {
            log.info(`expect: name: ${name} | email: ${email}`);
            log.info(`actual: name: ${nameStdout} | email: ${emailStdout}`);
            log.error('git config not match 【gum current alias】');
            process.exit(1);
            return;
        }
    });
}
