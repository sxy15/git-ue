var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from "inquirer";
import { log } from "../log.js";
import { getConfig, setConfig } from "../util.js";
import { CURRENT } from "../constants.js";
const { prompt } = inquirer;
export function rm(alias) {
    return __awaiter(this, void 0, void 0, function* () {
        const { config, current } = yield getConfig(false);
        const aliases = Object.entries(config).map(([key]) => key);
        if (!alias) {
            const answers = yield prompt([
                {
                    type: 'list',
                    name: 'alias',
                    message: 'select alias',
                    choices: aliases
                }
            ]);
            alias = answers.alias;
        }
        if (!aliases.includes(alias)) {
            log.error(`alias: ${alias} not exists`);
            return;
        }
        if (current === alias) {
            config[CURRENT] = '';
        }
        delete config[alias];
        yield setConfig(config, current);
        log.success(`rm alias: ${alias} success`);
    });
}
