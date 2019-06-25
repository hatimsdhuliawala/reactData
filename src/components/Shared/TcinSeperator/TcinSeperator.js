import _ from 'lodash'
const hasWhiteSpace = (s) => {
  return /\s/g.test(s)
}

const validTcin = (tcin) => {
  var isValid = false
  var validationRegexs = [
    '^[0-9]{5,8}$',
    '^B[0-9]{10,10}$"',
  ]
  _.each(validationRegexs, function (regex) {
    regex = new RegExp(regex)
    if (tcin.match(regex) !== null && tcin.match(regex)[0] === tcin) {
      isValid = true
    }
  })

  return isValid
}

export const splitTcins = (tcin) => {
  let tcins = tcin.split('\n')
  let tcinList = []
  let invalidTcin = []
  if (tcins.length > 0) {
    tcins.forEach(element => {
      if (element.trim() !== '') {
        if (element.indexOf(',') > -1) {
          element.split(',').forEach(item => {
            if (item.trim() !== '') {
              if (validTcin(item.trim())) {
                if (tcinList.indexOf(item.trim()) === -1) {
                  tcinList.push(item.trim())
                } else {
                  invalidTcin.push(item.trim())
                }
              } else {
                invalidTcin.push(item.trim())
              }
            }
          })
        } else if (hasWhiteSpace(element)) {
          element.split(' ').forEach(item => {
            if (item.trim() !== '') {
              if (validTcin(item.trim())) {
                if (tcinList.indexOf(item.trim()) === -1) {
                  tcinList.push(item.trim())
                } else {
                  invalidTcin.push(item.trim())
                }
              } else {
                invalidTcin.push(item.trim())
              }
            }
          })
        } else {
          if (validTcin(element.trim())) {
            if (tcinList.indexOf(element.trim()) === -1) {
              tcinList.push(element.trim())
            } else {
              invalidTcin.push(element.trim())
            }
          } else {
            invalidTcin.push(element.trim())
          }
        }
      }
    })
  }
  return tcinList
}
