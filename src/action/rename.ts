import inquirer from "inquirer";
import { getConfig, setConfig, renameKey } from "../util.js";
import { log } from "../log.js";

const { prompt } = inquirer;

export async function rename(alias?: string, newAlias?: string) {
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

  if(!newAlias) {
    const answers = await prompt([
      {
        type: 'input',
        name: 'newAlias',
        message: 'enter new alias'
      }
    ])

    newAlias = answers.newAlias;
  }

  if(!aliases.includes(alias!) || aliases.includes(newAlias!)) {
    log.error(`alias: ${alias} not exists or ${newAlias} already exists`);
    return;
  }

  const finalConfig = renameKey(config, alias!, newAlias!);

  await setConfig(finalConfig, current);

  log.success(`rename ${alias} to ${newAlias}`);
}