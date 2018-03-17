class ThousandsSeparator
  # Method to check the value conditions
  def check_number(number)
    # only number negative/positive is accepts or !== Sting/Integer
    return '0' if (!number.is_a?(String) && !number.is_a?(Integer)) || number.to_s.scan(/^(|-?\d+)$/).empty?

    # number length < 3 does not need treatment
    return number.to_s if number.to_i.abs.to_s.length <= 3

    # return raise if number > 15
    return raise ArgumentError, 'Number length is > 15' if number.to_i.abs.to_s.length > 15

    # return true
    true
  end
end

# Solution 1
class ThousandsSeparatorRegExp < ThousandsSeparator
  def format(number, separator = ',')
    value = check_number(number)
    if value != true
      return value
    else
      format_number(number, separator)
    end
  end

  private def format_number(number, separator)
    # Solution usigin reverse + scan(regex) + join
    # number.reverse.scan(/\d{1,3}/).join('#{separator}').reverse
    # Does not seem is efficient?!

    # Alternative with gsub
    number.to_s.gsub(/(\d)(?=(\d{3})+(?!\d))/, "\\&#{separator}")
  end
end

# Solution 2
class ThousandsSeparatorArray < ThousandsSeparator
  def format(number, separator = ',')
    value = check_number(number)
    if value != true
      return value
    else
      format_number(number, separator)
    end
  end

  private def format_number(number, separator)
    # Alternative with array structure
    number = number.to_s.chars.reverse.each_slice(3).map { |num|
      num.join
    }

    # Remove first comma in array if number contains negative symbol
    # e.g. ["654", "321", "654", "321", "-"]
    if number.include?('-')
      number.delete('-')
      number[-1] = number.last + '-' # add comma on string (last)
    end

    # return string 
    number.join(separator).reverse
  end
end

# Solution 3 ~> Idea by: Cary Swoveland via https://stackoverflow.com/a/26682481
class ThousandsSeparatorLoop < ThousandsSeparator
  def format(number, separator = ',')
    value = check_number(number)
    if value != true
      return value
    else
      format_number(number, separator)
    end
  end

  private def format_number(number, separator)
    value = number.to_s     # string
    value_size = value.size # size

    # Loop with for
    # i = 1; i < value_size; i += 3
    # for num in (3...value_size).step(3)
    #   value.insert(value_size - num, separator)
    # end

    # Alternative loop with step
    (3...value_size).step(3) { |num|
      value.insert(value_size - num, separator)
    }

    # Resolve problem with negatives
    if value.include?('-,')
      value = '-' + value[2..-1]
    end

    # return new string
    value
  end
end

# Solution 4 ~> Idea by: Mr Morphe via https://stackoverflow.com/a/24420462
class ThousandsSeparatorRecursive < ThousandsSeparator
  def format(number, separator = ',')
    value = check_number(number)
    if value != true
      return value
    else
      format_number(number, separator)
    end
  end

  private def format_number(number, separator, number_array = [])
    # Replace negative number to string "negative"
    if number.to_i.negative?
      return '-' + format_number(number.to_s.delete('-').to_i, separator)
    end

    # Use of calc with modules + recursive if the result is positive = create loop
    if (result = number % 1000).positive?
      format_number(number / 1000, separator, number_array)
    else
      return
    end

    # concet arrays
    number_array << result

    # return (convert array to string with concat)
    number_array.join(separator)
  end
end