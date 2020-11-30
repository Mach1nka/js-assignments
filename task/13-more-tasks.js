/**
 * Takes two strings including only letters from a to z.
 * Returns a new sorted string containing distinct letters.
 *
 * @param {string} value1
 * @param {string} value2
 * @return {string}
 *
 * @example
 *   'azy', 'bk' => 'abkyz'
 *   'zxxlal','laxk'    => 'aklxz'
 *   'abcdefghijklmnop',  'lmnopqrstuvwxyz'  => 'abcdefghijklmnopqrstuvwxyz'
 */
function distinctLettersString(value1, value2) {
  const str = value1 + value2, set = new Set();
  const sortedStr  = str.split('').sort(); 
  sortedStr.forEach(el => set.add(el));
  return [...set].join('');
}


/**
 * Takes a string with any characters.
 * Returns an object containing appearence of every distinct letters in lower case.
 *
 * @param {string} value
 * @return {Object}
 *
 * @example
 *  'Who you are, Buddy?' => { a:1, d:2, e:1, h:1, o:2, r:1, u:2, y:2 }
 *
 */

function lowerLetters(value) {
  const reg = /[a-z]/g, obj = {};
  const match = value.match(reg);
  match.forEach(el => {
    if(obj.hasOwnProperty(el)) obj[el] +=1;
    else obj[el] = 1;
  });
  return obj;
}

/**
 * Write a function that will convert a string into title case, given an optional
 * list of exception (minor words). The list of minor words will be given as a
 * string with each word separated by a space. Your function should ignore the
 * case of the minor words string - it should behave in the same way even if the
 * case of the minor word is changed
 *
 * @param {string} the original string to be converted
 * @param {string} list of minor words that must always be lowercase except for
 *                  the first word in the string
 * @return {string}
 *
 * @example
 *    'a clash of KINGS', 'a an the of'  =>  'A Clash of Kings'
 *    'THE WIND IN THE WILLOWS', 'The In'  => 'The Wind in the Willows'
 *    'the quick brown fox'  => 'The Quick Brown Fox'
 */

function titleCaseConvert(title, minorWords) {
  const answer = [];
  title = title.toLowerCase().split(' ');
  
  if (!minorWords) {
    return title.map(word => word[0].toUpperCase() + word.substring(1))
      .join(' ');
  } else minorWords = minorWords.toLowerCase();

  function convrtToUpperCase(arg) {
    return arg[0].toUpperCase() + arg.substring(1);
  }

  title.forEach(function(word, index) {
    if (index === 0) {
      answer.push(convrtToUpperCase(word));
    } else if (minorWords.indexOf(word) !== -1) {
      answer.push(word);
    } else {
      answer.push(convrtToUpperCase(word));
    }
  });

  return answer.join(' ');
}

/**
 * Your job is to create a calculator which evaluates expressions in Reverse Polish
 * notation (https://en.wikipedia.org/wiki/Reverse_Polish_notation). Empty expression
 * should evaluate to 0. Expression without operation returns the last number.
 *
 * @param {string} RPN string, each number and operation separated by a space
 *
 * @return {Number}
 *
 * @example
 *  ''  =>  0  // empty expression returns 0
 *  '1 2 3'  =>  3  // expression without operation returns the last number
 *  '4 2 +'  =>  6  // 4 + 2
 *  '2 5 * 2 + 3 /'  =>  4   //  ((5 * 2) + 2) / 3
 *  '5 1 2 + 4 * + 3 -'  =>  14   // 5 + ((1 + 2) * 4) -3
 */

function calcRPN(expr) {
  const splitStr = expr ? expr.split(' ') : null;
  
  function getPriority(token) {
    if (token === '*' || token === '/') return 3;
    else if (token === '+' || token === '-') return 2;
    else return 0;
  }

  function rpnToRes(stackNum) {
    if (!Array.isArray(stackNum)) return 0;
    const stack = [];
    stackNum.map(function(){
      for (let k = 0; k < stackNum.length; k++){
        if(stackNum[k] === '') stackNum.splice(k, 1);
      }
    });
    stackNum = stackNum.map(function(el){
      if(getPriority(el) === 0)return +el;
      else return el;
    });
    for (let i = 0; i < stackNum.length; i++) {
      if (getPriority(stackNum[i]) === 0) stack.push(stackNum[i]);
      if (getPriority(stackNum[i]) > 1){
        const x = stack.pop(), y = stack.pop();
        if(stackNum[i] === '-') stack.push(y - x);
        if(stackNum[i] === '+') stack.push(y + x);
        if(stackNum[i] === '*') stack.push(y * x);
        if(stackNum[i] === '/') stack.push(y / x);
      }
    }
    return stack.pop();
  }
  return rpnToRes(splitStr);
}

module.exports = {
  distinctLettersString,
  lowerLetters,
  titleCaseConvert,
  calcRPN
};