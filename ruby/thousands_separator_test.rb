require_relative 'thousands_separator'
require 'test/unit'

class ThousandsSeparatorTest < Test::Unit::TestCase
  def setup
    @TS_Regexp = ThousandsSeparatorRegExp.new
    @TS_Array = ThousandsSeparatorArray.new
    @TS_Loop =ThousandsSeparatorLoop.new
    @TS_Rec = ThousandsSeparatorRecursive.new

    @numbers = {
      0 => '0',
      12 => '12',
      123 => '123',
      '444' => '444', # test for type string/integer
      1234 => '1,234',
      987654321 => '987,654,321',
      9876543210 => '9,876,543,210'
    } 
  end

  
  # TS_Regexp :: TEST WITH VALUES POSITIVE
  def test_regexp_number_positive
    @numbers.each do |value, expected|
      assert_equal expected, @TS_Regexp.format(value)
    end
  end
  # TS_Regexp :: TEST WITH VALUES NEGATIVE
  def test_regexp_number_negative
    @numbers.each do |value, expected|
      # add auto negative values
      value = value.is_a?(String) ? '-' + value : value * -1
      expected = expected == '0' ? expected : '-' + expected

      assert_equal expected, @TS_Regexp.format(value)
    end
  end

  # TS_Array :: TEST WITH VALUES POSITIVE
  def test_array_number_positive
    @numbers.each do |value, expected|
      assert_equal expected, @TS_Array.format(value)
    end
  end
  # TS_Array :: TEST WITH VALUES NEGATIVE
  def test_array_number_negative
    @numbers.each do |value, expected|
      # add auto negative values
      value = value.is_a?(String) ? '-' + value : value * -1
      expected = expected == '0' ? expected : '-' + expected

      assert_equal expected, @TS_Array.format(value)
    end
  end

  # TS_Loop :: TEST WITH VALUES POSITIVE
  def test_loop_number_positive
    @numbers.each do |value, expected|
      assert_equal expected, @TS_Loop.format(value)
    end
  end
  # TS_Loop :: TEST WITH VALUES NEGATIVE
  def test_loop_number_negative
    @numbers.each do |value, expected|
      # add auto negative values
      value = value.is_a?(String) ? '-' + value : value * -1
      expected = expected == '0' ? expected : '-' + expected

      assert_equal expected, @TS_Loop.format(value)
    end
  end

  # TS_Rec :: TEST WITH VALUES POSITIVE
  def test_rec_number_positive
    @numbers.each do |value, expected|
      assert_equal expected, @TS_Rec.format(value)
    end
  end
  # TS_Rec :: TEST WITH VALUES NEGATIVE
  def test_rec_number_negative
    @numbers.each do |value, expected|
      # add auto negative values
      value = value.is_a?(String) ? '-' + value : value * -1
      expected = expected == '0' ? expected : '-' + expected

      assert_equal expected, @TS_Rec.format(value)
    end
  end
  

  # TEST WITH TYPES & NIL
  def test_string_empty
    assert_equal('0', @TS_Regexp.format(' '))
  end
  def test_string_boolean_true
    assert_equal('0', @TS_Regexp.format(true))
  end
  def test_string_boolean_false
    assert_equal('0', @TS_Regexp.format(false))
  end
  def test_string_nil
    assert_equal('0', @TS_Regexp.format(nil))
  end

  # TEST WITH VALUES
  def test_string_number_text
    assert_equal('0', @TS_Regexp.format('lorem123'))
  end

  def test_string_char_18
    assert_raise(ArgumentError, 'Number lenght is > 15') {
      @TS_Regexp.format('012345678901010101')
    }
  end
end