describe("Test Case 11.1.-2. Verify Mobile and Tablet Responsiveness", () => {
  beforeEach(() => {
    cy.visit("https://parabank.parasoft.com/parabank/index.htm");
  });

  it("should displays correctly on mobile devices", () => {
    cy.viewport("iphone-6");
    cy.get("#headerPanel").should("be.visible");

    cy.injectAxe();
    cy.checkA11y();

    cy.checkA11y(null, null, (violations) => {
      cy.task(
        "log",
        `${violations.length} accessibility violation(s) detected`
      );
      violations.forEach((violation) => {
        cy.task("log", `${violation.id}: ${violation.description}`);
      });
    });
  });

  it("should displays correctly on tablet devices", () => {
    cy.viewport("ipad-2");
    cy.get("#headerPanel").should("be.visible");

    cy.injectAxe();
    cy.checkA11y();

    cy.checkA11y(null, null, (violations) => {
      cy.task(
        "log",
        `${violations.length} accessibility violation(s) detected`
      );
      violations.forEach((violation) => {
        cy.task("log", `${violation.id}: ${violation.description}`);
      });
    });
  });
});
