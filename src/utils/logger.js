// utils/logger.js
import chalk from "chalk"; // install: npm i chalk

const logger = (type, message) => {
    const time = new Date().toISOString();
    if (process.env.NODE_ENV === "development") {
        switch (type) {
            case "info":
                console.log(chalk.blue(` 🟢 [INFO] [${time}] ${message}`));
                break;
            case "warn":
                console.log(chalk.yellow(` 🟡 [WARN] [${time}] ${message}`));
                break;
            case "error":
                console.log(chalk.red(` 🟥 [ERROR] [${time}] ${message}`));
                break;
            default:
                console.log(chalk.green(` 🟢 [LOG] [${time}] ${message}`));
        }
    } else {
        console.log(message);
    }
};

export default logger;
