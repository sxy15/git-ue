import chalk from 'chalk';
const log = {
    info: (message) => {
        console.log(chalk.blue(message));
    },
    error: (message) => {
        console.log(chalk.red(message));
    },
    success: (message) => {
        console.log(chalk.green(message));
    },
    table: (data) => {
        console.table(data);
    }
};
export { log };
