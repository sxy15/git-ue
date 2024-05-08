#!/usr/bin/env node

import { Command } from 'commander';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const pkg = require('../package.json');

const program = new Command();

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

program.parse();
