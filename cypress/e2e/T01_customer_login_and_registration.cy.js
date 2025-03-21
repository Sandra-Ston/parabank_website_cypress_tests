describe("1. Customer Login and Registration", () => {
  beforeEach(() => {
    cy.visitHomePage();
    cy.fixture("user").as("userData");
  });

  describe("Test Case 1.1. New Customer Registration", () => {
    it("should allow a new user to register successfully", function () {
      cy.registerUser(this.userData.validUser);
      cy.contains(
        "Your account was created successfully. You are now logged in."
      ).should("be.visible");
    });
  });

  describe("Test Cases 1.2-4. Customer Login", () => {
    it("should login with valid credentials", function () {
      cy.login(
        this.userData.validUser.username,
        this.userData.validUser.password
      );
      cy.contains(
        `Welcome ${this.userData.validUser.firstName} ${this.userData.validUser.lastName}`
      ).should("be.visible");
    });

    it("should display error for invalid credentials", function () {
      cy.login(
        this.userData.invalidUser.username,
        this.userData.invalidUser.password
      );
      cy.contains("Error!").should("be.visible");
      cy.contains("The username and password could not be verified.").should(
        "be.visible"
      );
    });

    it("should prompt for missing password when only username is entered", function () {
      cy.get("input[name='username']").type(this.userData.validUser.username);
      cy.get("input[value='Log In']").click();
      cy.contains("Please enter a username and password.").should("be.visible");
    });
  });

  describe("Test Cases 1.5-7. Password Recovery", () => {
    it("should allow users to recover their password", function () {
      cy.recoverPassword(this.userData.validUser);
      cy.contains(
        "Your login information was located successfully. You are now logged in."
      ).should("be.visible");
    });

    it("should display error for invalid credentials", function () {
      const invalidUser = {
        firstName: "Rose",
        lastName: "Wrong",
        address: {
          street: "Fake Street",
          city: "Nowhere",
          state: "Unknown",
          zipCode: "00000",
        },
        ssn: "999999999",
      };

      cy.recoverPassword(invalidUser);
      cy.contains(
        "The customer information provided could not be found."
      ).should("be.visible");
    });

    it("should display error for empty credentials", function () {
      cy.contains("Forgot login info?").should("be.visible").click();
      cy.get("input[value='Find My Login Info']").click();
      const requiredFields = [
        "First name is required.",
        "Last name is required.",
        "Address is required.",
        "City is required.",
        "State is required.",
        "Zip Code is required.",
        "Social Security Number is required",
      ];
      requiredFields.forEach((error) => {
        cy.contains(error).should("be.visible");
      });
    });
  });
});
