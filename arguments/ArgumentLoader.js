const ArgumentList = require("./ArgumentList");
const ArgumentParser = require("./ArgumentParser");

class ArgumentLoader {
  constructor() {
    const [nodePath, filePath, ...args] = process.argv;

    this.nodePath = nodePath;
    this.filePath = filePath;
    this._parser = new ArgumentParser();
    this._loadArgs(args);
    this._parseArgs();
  }

  _loadArgs(commandLineArgs) {
    this._loadedArgs = ArgumentList.getList().map(arg => {
      const commandLineArgument = commandLineArgs.find(a => {
        const [flag] = a.split("=");
        return arg.flags.includes(flag);
      });

      if (commandLineArgument) {
        const [flag, value] = commandLineArgument.split("=");
        return { argument: arg, value };
      }

      return { argument: arg, value: arg.default };
    });
  }

  _parseArgs() {
    this._parsedArgs = this._parser.parse(this._loadedArgs);
  }

  getArgs() {
    return this._parsedArgs;
  }

  getValue(name) {
    return this._parsedArgs[name];
  }
}

module.exports = ArgumentLoader;
