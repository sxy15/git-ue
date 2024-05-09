import { log } from "../log.js";
import { getConfig, setConfig } from "../util.js";
import inquirer from "inquirer";
import { execa } from "execa"; 

const { prompt } = inquirer;

export async function use(alias?: string) {
  const { config } = await getConfig(false);
  const aliases: string[] = Object.entries(config).map(([key]) => key);

  if(!alias) {
    const answers = await prompt([
      {
        type: 'list',
        name: 'alias',
        message: 'select alias',
        choices: aliases
      }
    ])

    alias = answers.alias;
  }

  if(!aliases.includes(alias as string)) {
    log.error(`alias: ${alias} not exists`);
    return;
  }

  await execa('git', ['config', '--global', 'user.name', config[alias!].name]);
  await execa('git', ['config', '--global', 'user.email', config[alias!].email]);

  await setConfig(config, alias);

  log.success(`use alias: ${alias}`);
}