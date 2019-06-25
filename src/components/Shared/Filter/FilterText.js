export const filterText = (rules, searchText) => {
  for (var data in rules) {
    if (rules[data] != null && rules[data].toString().toLocaleLowerCase().indexOf(searchText.toLowerCase()) > -1) {
      return true
    }
  }
  return false
}
