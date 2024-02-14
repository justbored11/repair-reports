const testUsername = "bob@bob.com";
const testUserPW = "123456789";

describe("/repair route", () => {
  describe("checking all newest repair links", () => {
    // let entryLinks = [];
    it("test", () => {
      cy.viewport("iphone-4");
      cy.visit("http://localhost:8000/");

      cy.click_mobile_link("/repair");
      cy.mobile_login(testUsername, testUserPW);

      cy.get("[data-test='entry'] a").each((entry) => {
        cy.visit(entry[0].href);
      });
    });
  });
});
