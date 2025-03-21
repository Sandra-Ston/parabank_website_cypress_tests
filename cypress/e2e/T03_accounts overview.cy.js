describe("3. Accounts Overview", () => {
  beforeEach(() => {
    cy.fixture("user").then((data) => {
      const user = data.validUser;
      cy.restoreSession(user.username, user.password);

      cy.visitHomePage();
      cy.contains(`Welcome ${user.firstName} ${user.lastName}`, {
        timeout: 1000,
      }).should("be.visible");
    });
  });

  describe("Test Case 3.1: Account Overview", () => {
    it("should verify account details and transactions load correctly", () => {
      cy.contains("Accounts Overview").click();
      cy.url().should("include", "overview.htm");

      cy.get("#accountTable").should("be.visible");
      cy.get("#accountTable > thead > tr > th:nth-child(1)").should(
        "contain",
        "Account"
      );
      cy.get("#accountTable > thead > tr > th:nth-child(2)").should(
        "contain",
        "Balance"
      );
      cy.get("#accountTable > thead > tr > th:nth-child(3)").should(
        "contain",
        "Available Amount"
      );

      cy.get(
        "#accountTable > tbody > tr:nth-child(1) > td:nth-child(1) > a"
      ).click();

      cy.contains("Account Details").should("be.visible");
      cy.contains("Account Activity").should("be.visible");
      cy.contains("Funds Transfer Sent").click();
      cy.url().should("include", "transaction.htm");
      cy.contains("Transaction Details").should("be.visible");
    });
  });
});
