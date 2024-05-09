#!/usr/bin/env node
import { Command } from 'commander';
import { createRequire } from 'module';

const program = new Command();

const require = createRequire(import.meta.url);
const pkg = require('../package.json');
const { version } = pkg

program
  .version(version)
  .description('a tool for git switch user and email')

program
  .command('add')
  .option('-a, --alias <id>', 'alias')
  .option('-n, --name <name>', 'user.name')
  .option('-e, --email <email>', 'user.email')
  .description('add user.name and user.email')
  .action(async (options) => {
    const { add } = await import('./action/add.js');
    
    return add(options);
  });

program
  .command('current')
  .description('show current user.name and user.email')
  .action(async () => {
    const { current } = await import('./action/current.js');

    return current();
  });

program
  .command('ls')
  .description('show all alias')
  .action(async () => {
    const { ls } = await import('./action/ls.js');

    return ls();
  });

program
  .command('use [alias]')
  .description('use alias config')
  .action(async (alias) => {
    const { use } = await import('./action/use.js');

    return use(alias);
  });

program
  .command('rm [alias]')
  .description('remove alias config')
  .action(async (alias) => {
    const { rm } = await import('./action/rm.js');

    return rm(alias);
  });

program
  .command('rename [alias] [newAlias]')
  .description('rename alias')
  .action(async (alias, newAlias) => {
    const { rename } = await import('./action/rename.js');

    return rename(alias, newAlias);
  });

program
  .command('bind <alias>')
  .description('bind current git remote to alias')
  .action(async (alias) => {
    const { bind } = await import('./action/bind.js');

    return bind(alias);
  });

program
  .command('check')
  .description('check git config')
  .action(async () => {
    const { check } = await import('./action/check.js');

    return check();
  });

program.parse();
