#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Command } from 'commander';
import { createRequire } from 'module';
const program = new Command();
const require = createRequire(import.meta.url);
const pkg = require('../package.json');
const { version } = pkg;
program
    .version(version)
    .description('a tool for git switch user and email');
program
    .command('add')
    .option('-a, --alias <id>', 'alias')
    .option('-n, --name <name>', 'user.name')
    .option('-e, --email <email>', 'user.email')
    .description('add user.name and user.email')
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    const { add } = yield import('./action/add.js');
    return add(options);
}));
program
    .command('current')
    .description('show current user.name and user.email')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    const { current } = yield import('./action/current.js');
    return current();
}));
program
    .command('ls')
    .description('show all alias')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    const { ls } = yield import('./action/ls.js');
    return ls();
}));
program
    .command('use [alias]')
    .description('use alias config')
    .action((alias) => __awaiter(void 0, void 0, void 0, function* () {
    const { use } = yield import('./action/use.js');
    return use(alias);
}));
program
    .command('rm [alias]')
    .description('remove alias config')
    .action((alias) => __awaiter(void 0, void 0, void 0, function* () {
    const { rm } = yield import('./action/rm.js');
    return rm(alias);
}));
program
    .command('rename [alias] [newAlias]')
    .description('rename alias')
    .action((alias, newAlias) => __awaiter(void 0, void 0, void 0, function* () {
    const { rename } = yield import('./action/rename.js');
    return rename(alias, newAlias);
}));
program
    .command('check')
    .description('check git config')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    const { check } = yield import('./action/check.js');
    return check();
}));
program.parse();
