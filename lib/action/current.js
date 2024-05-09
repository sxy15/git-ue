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
export function current() {
    return __awaiter(this, void 0, void 0, function* () {
        const { config, current } = yield getConfig();
        if (!current) {
            log.error('current alias not set');
            return;
        }
        const { name, email } = config[current] || {};
        if (!name) {
            log.error(`current alias: ${current} not exists`);
            return;
        }
        log.info(`current alias: ${current} | name: ${name} | email: ${email}`);
    });
}
