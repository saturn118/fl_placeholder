import Fuse from "fuse.js";

export function FuzzySearch(
  searchTerm,
  inputSearchData,
  keysToSearchList,
  minimumCharacterLength = 3
) {
  if (
    !searchTerm ||
    searchTerm.length < minimumCharacterLength ||
    keysToSearchList.length == 0
  ) {
    return null;
  }

  const options = {
    includeScore: true,
    // minMatchCharLength: minimumCharacterLength,
    threshold: 0.15,
    keys: keysToSearchList
  };

  let outputMap = {};
  const fuse = new Fuse(inputSearchData, options);

  const results = fuse.search(searchTerm);
  return results;
}
