var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fse from 'fs-extra';
import { CONFIG_PATH, CURRENT } from './constants.js';
const { readFile, ensureFile, writeFile } = fse;
export function getConfig(hasCurrent = true) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ensureFile(CONFIG_PATH);
        const configString = yield readFile(CONFIG_PATH, 'utf-8');
        const config = configString ? JSON.parse(configString) : {};
        const current = config[CURRENT];
        if (!hasCurrent) {
            delete config[CURRENT];
        }
        return { config, current };
    });
}
export function setConfig(config, current) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ensureFile(CONFIG_PATH);
        if (current) {
            config[CURRENT] = current;
        }
        yield writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));
    });
}
export function renameKey(config, oldKey, newKey) {
    const _config = {};
    for (const alias in config) {
        const isSame = alias === oldKey;
        _config[isSame ? newKey : alias] = config[alias];
    }
    return _config;
}
