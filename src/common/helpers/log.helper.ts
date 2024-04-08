import { format } from 'winston';

export function logFormat() {
  return format.printf(({ level, message, ms, context, ...x }) => {
    let m = `[${level.toUpperCase()}] ${context} (${ms}): ${message}`;
    if (x.stack) {
      const temp = (x.stack as string[]).reduce((a, c) => `${a}\n${c}`, '');
      m += '\n\n' + temp.replace(/(at |\()\/app\//g, './');
    }
    return m;
  });
}
