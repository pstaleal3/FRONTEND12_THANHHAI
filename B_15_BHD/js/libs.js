function formatDay(str){
  if(str == 'Monday') {
    str = 'Thứ 2';
  } else if(str == 'Tuesday') {
    str = 'Thứ 3';
  } else if (str == 'Wednesday') {
    str = 'Thứ 4';
  }
  else if (str == 'Thursday') {
    str = 'Thứ 5';
  }
  else if (str == 'Friday') {
    str = 'Thứ 6';
  }
  else if (str == 'Saturday') {
    str = 'Thứ 7';
  }
  else if (str == 'Sunday') {
    str = 'Chủ nhật';
  }
  return str;
}