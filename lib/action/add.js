var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from 'inquirer';
import { log } from '../log.js';
const { prompt } = inquirer;
const questions = [
    {
        key: 'alias',
        type: 'input',
        name: 'alias',
        message: 'enter alias: '
    },
    {
        key: 'name',
        type: 'input',
        name: 'name',
        message: 'enter user name: '
    },
    {
        key: 'email',
        type: 'input',
        name: 'email',
        message: 'enter user email: '
    }
];
export function add(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const opts = Object.assign({}, options);
        const _questions = questions.filter((item) => !opts[item.key]);
        yield prompt(_questions).then((_answers) => {
            const answers = Object.assign(Object.assign({}, opts), _answers);
            log.info(`alias: ${answers.alias} | name: ${answers.name} | email: ${answers.email}`);
        });
    });
}
