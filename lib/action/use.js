var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { log } from "../log.js";
import { getConfig, setConfig } from "../util.js";
import inquirer from "inquirer";
import { execa } from "execa";
const { prompt } = inquirer;
export function use(alias) {
    return __awaiter(this, void 0, void 0, function* () {
        const { config } = yield getConfig(false);
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
        yield execa('git', ['config', '--global', 'user.name', config[alias].name]);
        yield execa('git', ['config', '--global', 'user.email', config[alias].email]);
        yield setConfig(config, alias);
        log.success(`use alias: ${alias}`);
    });
}
