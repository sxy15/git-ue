import inquirer from 'inquirer';
import { log } from '../log.js';
import { getConfig, setConfig } from '../util.js';
import type { addType } from "../types.js";

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
]

export async function add(options: addType) {
  const opts: addType = {...options};

  const _questions = questions.filter((item) => !opts[item.key as keyof addType])

  const _answers = await prompt(_questions)

  const answers: Required<addType> = {...opts, ..._answers};

  log.info(`alias: ${answers.alias} | name: ${answers.name} | email: ${answers.email}`);

  const { config } = await getConfig();

  if(config[answers.alias]) {
    log.error(`alias ${answers.alias} already exists`);
    return;
  }

  config[answers.alias] = {
    name: answers.name,
    email: answers.email
  }

  await setConfig(config);

  log.success('add success');
}
