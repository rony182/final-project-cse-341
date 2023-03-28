function filterByTerm(inputArr, searchTerm) {
  if (!searchTerm) {
    throw Error("searchTerm cannot be empty");
  } 
  if (!inputArr.length) {
    throw Error("inputArr cannot be empty");
  } 

  const term = searchTerm.toLowerCase();
  const regex = new RegExp(term, 'i');
  const lists =  inputArr.filter((arrayElement) => {
      return arrayElement.url.match(regex);
    });
  
  // console.log(lists);
  return lists;
}


describe("Filter function", () => {
    test("it should filter by a search term (link)", () => {
      const input = [
        { id: 1, url: "https://www.url1.dev" },
        { id: 2, url: "https://www.url2.dev" },
        { id: 3, url: "https://www.link3.dev" }
      ];
  
      const output = [{ id: 3, url: "https://www.link3.dev" }];
      const output2 =  [
        { id: 1, url: 'https://www.url1.dev' },
        { id: 2, url: 'https://www.url2.dev' }
      ];
  
      expect(filterByTerm(input, "link")).toEqual(output);
      expect(filterByTerm(input, "LINK")).toEqual(output);
      expect(filterByTerm(input, "uRl")).toEqual(output2);
    });

    test("it should throw when searchTerm is empty string", () => {
      expect(() => {
        filterByTerm([], "");
      }).toThrowError(Error("searchTerm cannot be empty"));
    });
  });

  // npm run jest -- --coverage 