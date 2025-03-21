describe("8. Request Loan", () => {
  beforeEach(() => {
    cy.visit("https://parabank.parasoft.com/parabank/index.htm");

    cy.fixture("user").then((data) => {
      const user = data.validUser;
      cy.get('input[name="username"]').type(user.username);
      cy.get('input[name="password"]').type(user.password);
      cy.get('input[type="submit"]').click();

      cy.contains(`Welcome ${user.firstName} ${user.lastName}`).should(
        "be.visible"
      );
    });
  });

  describe("Test Case 8.1. Validate Successful Loan Request", () => {
    it("should process a loan request successfully and update account information", () => {
      cy.contains("Request Loan").click();
      cy.url().should("include", "requestloan.htm");

      cy.get("#amount").type("1000");
      cy.get("#downPayment").type("100");

      cy.get("#fromAccountId")
        .find("option")
        .first()
        .then((option) => {
          const account = option.val();
          cy.get("#fromAccountId").select(account);
        });

      cy.get("input[value='Apply Now']").click();

      cy.contains("Loan Request Processed").should("be.visible");
      cy.contains("Approved").should("be.visible");

      cy.get("a").contains(/\d+/).first().click();
      cy.contains("Account Details").should("be.visible");

      cy.contains("Accounts Overview").click();
      cy.url().should("include", "overview.htm");
      cy.get("#accountTable").should("be.visible");
    });
  });

  describe("Test Case 8.2. Validate Unsuccessful Loan Request", () => {
    it("should process a loan request unsuccessfully and display a denial message", () => {
      cy.contains("Request Loan").click();
      cy.url().should("include", "requestloan.htm");

      cy.get("#amount").type("100000000");
      cy.get("#downPayment").type("10");

      cy.get("#fromAccountId")
        .find("option")
        .first()
        .then((option) => {
          const account = option.val();
          cy.get("#fromAccountId").select(account);
        });

      cy.get("input[value='Apply Now']").click();

      cy.contains("Loan Request Processed").should("be.visible");
      cy.contains("Denied").should("be.visible");
    });
  });

  describe("Test Case 8.3. Validate Empty Loan Request", () => {
    it("should display required warnings when no loan details are entered", () => {
      cy.contains("Request Loan").click();
      cy.url().should("include", "requestloan.htm");

      cy.get("#fromAccountId")
        .find("option")
        .first()
        .then((option) => {
          const account = option.val();
          cy.get("#fromAccountId").select(account);
        });

      cy.get("input[value='Apply Now']").click();

      cy.contains("Loan amount is required").should("be.visible");
      cy.contains("Down payment is required").should("be.visible");
    });
  });
});
