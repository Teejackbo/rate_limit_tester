class ArgumentParser {
  _parseValue(arg) {
    if (arg.value === "|date|") return Date.now().toString();

    switch (arg.argument.type) {
      case "int":
        return parseInt(arg.value);

      case "text|lowercase":
        return arg.value.toLowerCase();

      default:
        return arg.value;
    }
  }

  parse(args) {
    return args.reduce((total, next) => {
      total[next.argument.name] = this._parseValue(next);
      return total;
    }, {});
  }
}

module.exports = ArgumentParser;
