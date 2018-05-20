/*
Реализуйте и экспортируйте функцию по умолчанию,
которая принимает на вход текст и возвращает массив,
состоящий из первых слов каждой строки текста.
Пустые строчки должны игнорироваться.

    Строки разделяются переводом строки
    В любом месте строки может быть сколько угодно пробелов
    Текст должен перебираться посимвольно (мы пишем лексер)

const text = '  what who   \nhellomy\n hello who are you\n';
const result = solution(text);
// [
//   'what',
//   'hellomy',
//   'hello',
// ];

Решение должно быть автоматным
*/

export default (text) => {
  const iter = (chArr, res, state, curStr) => {
    if (chArr.length === 0) return res;
    const [char, ...rest] = chArr;

    switch (state) {
      case 'find-str':
        if (char !== ' ' && char !== '\n') return iter(rest, res, 'in-str', char);
        return iter(rest, res, 'find-str', curStr);

      case 'in-str':
        if (char === ' ') return iter(rest, [...res, curStr], 'find-end', '');
        if (char === '\n') return iter(rest, [...res, curStr], 'find-str', '');
        return iter(rest, res, 'in-str', `${curStr}${char}`);

      case 'find-end':
        if (char === '\n') return iter(rest, res, 'find-str', '');
        return iter(rest, res, 'find-end', '');

      default:
        throw new Error(`Unexpected state '${state}'`);
    }
  };
  return iter(text.split(''), [], 'find-str', '');
};
