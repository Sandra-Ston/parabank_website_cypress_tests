describe("7. Update Contact Info", () => {
  beforeEach(() => {
    cy.visit("https://parabank.parasoft.com/parabank/index.htm");

    cy.fixture("user").then((data) => {
      const user = data.validUser;
      // Optionally restore session if you use that command:
      cy.restoreSession(user.username, user.password);
      cy.visitHomePage();
      cy.contains(`Welcome ${user.firstName} ${user.lastName}`, {
        timeout: 10000,
      }).should("be.visible");
    });

    cy.contains("Update Contact Info").click();
    cy.url().should("include", "updateprofile.htm");
    cy.get("h1").contains("Update Profile").should("be.visible").wait(500);
  });

  describe("Test Case 7.1. Validate Successful Contact Info Update", () => {
    it("should update contact information successfully", () => {
      cy.get("input[name='customer.address.street']")
        .clear()
        .type("456 Updated St");
      cy.get("input[name='customer.address.city']")
        .clear()
        .type("Updated City");
      cy.get("input[name='customer.address.state']")
        .clear()
        .type("Updated State");
      cy.get("input[name='customer.address.zipCode']").clear().type("12345");
      cy.get("input[name='customer.phoneNumber']").clear().type("1112223333");

      cy.get("input[value='Update Profile']").click();

      cy.contains("Profile Updated").should("be.visible");
      cy.contains(
        "Your updated address and phone number have been added to the system."
      ).should("be.visible");
    });
  });

  describe("Test Case 7.2. Validate Empty Contact Info Update", () => {
    it("should display required warnings when contact info is empty", () => {
      cy.get("input[name='customer.firstName']").clear();
      cy.get("input[name='customer.lastName']").clear();
      cy.get("input[name='customer.address.street']").clear();
      cy.get("input[name='customer.address.city']").clear();
      cy.get("input[name='customer.address.state']").clear();
      cy.get("input[name='customer.address.zipCode']").clear();
      cy.get("input[name='customer.phoneNumber']").clear();

      cy.get("input[value='Update Profile']").click();

      cy.contains("Last name is required").should("be.visible");
      cy.contains("Address is required").should("be.visible");
      cy.contains("City is required").should("be.visible");
      cy.contains("State is required").should("be.visible");
      cy.contains("Zip Code is required").should("be.visible");
      cy.contains("Phone number is required").should("be.visible");
    });
  });
});
