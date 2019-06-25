export const LongDate = (epochDate) => {
  var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var date = new Date(epochDate)
  return month[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' ' + ' ' + date.getHours() % 12 + ':' + twoDigit(date.getMinutes()) + ' ' + timezone(date.getHours())
}

export const ShortDate = (epochDate) => {
  var date = new Date(epochDate)
  return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + ' ' + date.getHours() % 12 + ':' + twoDigit(date.getMinutes()) + ' ' + timezone(date.getHours())
}

const timezone = (hour) => {
  if (hour >= 12) {
    return 'PM'
  }
  return 'AM'
}

const twoDigit = (minutes) => {
  minutes = minutes > 9 ? minutes : '0' + minutes
  return minutes
}
