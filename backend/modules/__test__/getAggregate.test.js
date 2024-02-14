const { getAggregate } = require("../getAggregate");
const testPhrase = "ddec5 no inj";

describe(" make querys from string to use in aggregate", () => {
  test("return empty array if empty argument", () => {
    expect(Array.isArray(getAggregate())).toBe(true);
  });
  test("must return array", () => {
    expect(Array.isArray(getAggregate(testPhrase))).toBe(true);
  });

  test("array length is equal to words passed in", () => {
    expect(getAggregate(testPhrase).length).toBe(3);
  });
  test("array length different size should fail", () => {
    const querys = getAggregate(testPhrase);
    expect(getAggregate(testPhrase + " anotherword").length).not.toBe(3);
    console.log(querys);
  });
  test("query objects should be formated correctly", () => {
    const querys = getAggregate(testPhrase);
    expect(getAggregate(testPhrase + " anotherword").length).not.toBe(3);
    console.log(querys);
    querys.forEach((element) => {
      expect(element.text).toBeTruthy();
      expect(element.text.query).toBeTruthy();
      expect(element.text.path).toBeTruthy();
      expect(element.text.fuzzy).toBeTruthy();
    });
  });
});
