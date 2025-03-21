describe("2. Account Services", () => {
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

  describe("Test Cases 2.1-2. Open New Accounts", () => {
    it("should open a new checking account successfully", () => {
      cy.contains("Open New Account").click();
      cy.url().should("include", "openaccount.htm");

      cy.get("#type").select("CHECKING");
      cy.get("#fromAccountId").select(0);
      cy.get('input[type="button"].button[value="Open New Account"]').click();

      cy.contains("Account Opened!").should("be.visible");
      cy.contains("Congratulations, your account is now open.").should(
        "be.visible"
      );
      cy.get("#newAccountId").should("be.visible").click();

      cy.contains("Account Details").should("be.visible");
      cy.contains("Account Activity").should("be.visible");

      cy.contains("Funds Transfer Received").click();
      cy.url().should("include", "transaction.htm");
      cy.contains("Transaction Details").should("be.visible");
    });

    it("should open a new savings account successfully", () => {
      cy.contains("Open New Account").click();
      cy.url().should("include", "openaccount.htm");

      cy.get("#type").select("SAVINGS");
      cy.get("#fromAccountId").select(0);
      cy.get('input[type="button"].button[value="Open New Account"]').click();

      cy.contains("Account Opened!").should("be.visible");
      cy.contains("Congratulations, your account is now open.").should(
        "be.visible"
      );
      cy.get("#newAccountId").should("be.visible").click();

      cy.contains("Account Details").should("be.visible");
      cy.contains("Account Activity").should("be.visible");

      cy.contains("Funds Transfer Received").click();
      cy.url().should("include", "transaction.htm");
      cy.contains("Transaction Details").should("be.visible");
    });
  });
});
