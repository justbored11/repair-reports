// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("logout_mobile", () => {
  ///logout
  cy.get("[data-test='avatar-menu']").click();
  cy.get("[data-test='avatar-menu'] li").should("be.visible");
  cy.get("[data-test='avatar-menu'] li a[ href='/logout']").click();
});

Cypress.Commands.add("click_mobile_link", (link) => {
  //test dashboard link
  cy.get("[data-test='mobile-nav']").click();
  cy.get(`[data-test='mobile-menu'] li [ href='${link}']`).click();
  //if not logged in should direct to login
});

Cypress.Commands.add("mobile_login", (username, pass) => {
  //login
  cy.get("#email").type(username);
  cy.get("#password").type(pass);
  cy.get("form > .btn").click();
});

Cypress.Commands.add("test_mobile_home_links", (link, username, pass) => {
  cy.click_mobile_link(`${link}`);
  cy.location().should((loc) => {
    expect(loc.href).to.eq("http://localhost:8000/login");
  });

  //login
  cy.mobile_login(username, pass);
  cy.location().should((loc) => {
    expect(loc.href).to.eq(`http://localhost:8000${link}`);
  });

  //logout
  cy.logout_mobile();
});
