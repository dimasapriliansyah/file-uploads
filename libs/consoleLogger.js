const dateTime = require('date-time');

const consoleLogger = (loglevel, message, scriptThatCalling, functionThatCalling) => {

  const script = scriptThatCalling || "-";
  const func = functionThatCalling || "-";

  const now = dateTime({ showTimeZone: true });

  if (process.env.NODE_ENV !== "production") {
    switch (loglevel) {
      case "log":
        console.log(`${message} || [${script}] [${func}] [${now}]`);
        console.log(message);
        break;
      case "warning":
        console.warn(`${message} || [${script}] [${func}] [${now}]`);
        console.warn(message);
        break;
      case "error":
        console.error(`${message} || [${script}] [${func}] [${now}]`)
        console.error(message);
        break;
      default:
        console.log(`${message} || [${script}] [${func}] [${now}]`);
        console.log(message);
        break;

    }
  }

  return

}

module.exports = consoleLogger;