const exec = require('child_process').exec;
const chalk = require('chalk');

exec('npm run lint', (error, stdout, stderr) => {
    if (!stderr) {
        global.console.log(chalk.greenBright('✔ No lLinting errors found!'));
    }
});
