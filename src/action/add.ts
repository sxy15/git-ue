import inquirer from 'inquirer';
import { log } from '../log.js';
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

  await prompt(_questions).then((_answers) => {
    const answers = {...opts, ..._answers};

    log.info(`alias: ${answers.alias} | name: ${answers.name} | email: ${answers.email}`);
  })
}