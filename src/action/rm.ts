import inquirer from "inquirer";
import { log } from "../log.js";
import { getConfig, setConfig } from "../util.js";
import { CURRENT } from "../constants.js";

const { prompt } = inquirer;

export async function rm(alias?: string) {
  const { config, current } = await getConfig(false);
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

  if(current === alias) {
    config[CURRENT] = ''
  }

  delete config[alias as string];

  await setConfig(config, current);

  log.success(`rm alias: ${alias} success`)
}