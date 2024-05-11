import createThumbUrl from "../createThumbUrl";

const correctThumbUrl =
  "https://res.cloudinary.com/da6jwh1id/image/upload/c_thumb,w_200,g_face/v1715025448/no_folder/63629c7c159bbca8835346f0/hezxm0cjlg2xwofrlole.jpg";
const testUrl =
  "https://res.cloudinary.com/da6jwh1id/image/upload/v1715025448/no_folder/63629c7c159bbca8835346f0/hezxm0cjlg2xwofrlole.jpg";

describe("test createThumbUrl utility", () => {
  test("should return string", () => {
    const url = createThumbUrl(testUrl);
    expect(typeof url).toBe("string");
    return;
  });
  test("accept only string argument", () => {
    //@ts-expect-error testing invalid input
    expect(() => createThumbUrl(3)).toThrow(Error);
    expect(createThumbUrl("d")).toBeTruthy;
  });

  test("return string of longer length", () => {
    const url = createThumbUrl(testUrl);
    expect(url.length).toBeGreaterThan(testUrl.length);
  });
  test("return correctly formated string", () => {
    const url = createThumbUrl(testUrl);
    expect(url).toBe(correctThumbUrl);
  });
});
