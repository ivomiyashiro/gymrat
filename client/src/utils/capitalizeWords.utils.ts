export const capitalizeWords = (str: string) => {
  var words = str.split(' ');

  for (var i = 0; i < words.length; i++) {
    if (words[i].includes('-')) {
      var subWords = words[i].split('-');
      for (var j = 1; j < subWords.length; j++) {
        subWords[j] = subWords[j][0].toUpperCase() + subWords[j].substring(1);
      }
      words[i] = subWords.join('-');
    }
  }

  var capitalizedStr = words.join(' ');

  return capitalizedStr;
};
