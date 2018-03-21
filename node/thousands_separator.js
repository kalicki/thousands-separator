/* jshint esversion: 6 */
class ThousandsSeparator {
  // Method to check the value conditions
  check_number(number) {
    // only number negative/positive is accepts or !== Sting/Integer
    if ((typeof number !== 'string' && typeof number !== 'number') || /^(|-?\d+)$/.test(number) === false) {
      return '0';
    }

    // number length < 3 does not need treatment
    if ((Math.abs(parseInt(number)).toString()).length <= 3) {
      return number.toString();
    }

    // return raise if number > 15
    if ((Math.abs(parseInt(number)).toString()).length > 15) {
      throw new Error('Number length is > 15');
    }

    // return true
    return true;
  }
}

// Solution 1
class ThousandsSeparatorRegExp extends ThousandsSeparator {
  format(number, separator = ',') {
    var value = this.check_number(number);
    if (value !== true)
      return value
    else
      return this._format_number(number, separator);
  }

  // Solution with replace via regex
  _format_number(number, separator) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1'+ separator).toString();
  }
}

// Solution 2
class ThousandsSeparatorArray extends ThousandsSeparator {
  format(number, separator = ',') {
    var value = this.check_number(number);
    if (value !== true)
      return value
    else
      return this._format_number(number, separator);
  }

  _format_number(number, separator) {
    var negative = false;
    var arr = [];
    var number = number.toString().split('').reverse();
  
    // Alternative with array structure
    for (var i = 0; i < number.length; i += 3) {
      arr.push(number.slice(i, i + 3))
    }
    
    // map and join in array
    var number = arr.map(function(num) {
      // for symbol 'negative'
      if (num == '-') {
        negative = true;
      }
        
      return num.reverse().join('');
    });
    
    // if exists symbol '-' then remove
    if (negative === true) {
      // remove element with symbol 'negative'
      number.splice([number.indexOf('-')], 1);
      negative = '-'
    } else {
      negative = '';
    }
    
    // return string formated
    return negative + number.reverse().join(separator).toString();
  }
}

// Solution 3 ~> Inspired by /ruby/thousands_separator.rb:68
class ThousandsSeparatorLoopString extends ThousandsSeparator {
  format(number, separator = ',') {
    var value = this.check_number(number);
    if (value !== true)
      return value
    else
      return this._format_number(number, separator);
  }

  _format_number(number, separator) {
    var value = number.toString();
    var value_size = value.length;

    // Alternative loop with slep
    for (var i = 3; i < value_size; i += 3) {
      value = value.slice(0, value_size - i) + separator + value.slice(value_size - i)
    }

    // fix for negative value
    if (value.includes('-,')) {
      value = '-' + value.slice(2, value_size + 3);
    }

    return value;
  }
}

// Solution 4 ~> Inspired by /ruby/thousands_separator.rb:105
class ThousandsSeparatorRecursive extends ThousandsSeparator {
  format(number, separator = ',') {
    var value = this.check_number(number);
    if (value !== true)
      return value
    else
      return this._format_number(number, separator);
  }

  _format_number(number, separator, number_array = []) {
    // Replace negative number to string "negative"
    if (Math.sign(parseInt(number)) === -1) {
      return '-' + this._format_number(Math.abs(number.toString()), separator)
    }

    // Use of calc with module + recursive if result is > 0 then run recursive
    let result = parseInt(number % 1000);
    if ( result > 0) {
      this._format_number(parseInt(number / 1000), separator, number_array)
    } else {
      return
    }

    // add in arrays
    number_array.push(result);

    // return (convert array to string with concat)
    return number_array.join(separator)
  }
}

module.exports = {
  ThousandsSeparatorRegExp,
  ThousandsSeparatorArray,
  ThousandsSeparatorLoopString,
  ThousandsSeparatorRecursive
}
