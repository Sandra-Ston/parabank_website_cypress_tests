describe("4. Transfer Funds", () => {
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

  describe("Test Case 4.1. Validate Successful Fund Transfers", () => {
    it("should successfully transfer funds between accounts", () => {
      cy.contains("Transfer Funds").should("be.visible").click();
      cy.url().should("include", "transfer.htm");
      cy.contains("Transfer Funds").should("be.visible");

      const transferAmount = "100";
      cy.get("#amount").type(transferAmount);

      cy.get("#fromAccountId")
        .find("option")
        .first()
        .invoke("val")
        .then((fromAccount) => {
          cy.get("#fromAccountId").select(fromAccount);

          cy.get("#toAccountId")
            .find("option")
            .last()
            .invoke("val")
            .then((toAccount) => {
              cy.get("#toAccountId").select(toAccount);

              cy.get('input[value="Transfer"]').click();

              cy.contains("Transfer Complete!").should("be.visible");

              cy.contains(
                new RegExp(
                  `\\$${transferAmount}\\.00 has been transferred from account #${fromAccount} to account #${toAccount}`,
                  'i'
                )
              ).should("be.visible");

              cy.contains("Accounts Overview").click();
              cy.url().should("include", "overview.htm");

              cy.contains("Accounts Overview").should("be.visible");

              cy.get("#accountTable").should("be.visible");
              cy.get("#accountTable tbody tr").should(
                "have.length.greaterThan",
                1
              );
            });
        });
    });
  });
});
