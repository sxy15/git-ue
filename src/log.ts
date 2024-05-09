import chalk from 'chalk'

const log = {
  info: (message: string) => {
    console.log(chalk.blue(message))
  },
  error: (message: string) => {
    console.log(chalk.red(message))
  },
  success: (message: string) => {
    console.log(chalk.green(message))
  },
  table: (data: any) => {
    console.table(data)
  }
}

export { log }