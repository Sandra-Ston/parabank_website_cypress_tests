describe("10. Customer Care Request", () => {
  const contactDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    message: "This is a test message.",
  };

  beforeEach(() => {
    cy.visitHomePage();
  });

  describe("Test Case 10.1. Validate Successful Submission Of Customer Care Requests From Top Navigation", () => {
    it("should successfully submit a customer care request from top navigation", () => {
      cy.get(".contact").first().click();

      cy.url().should("include", "contact.htm");
      cy.get('input[name="name"]').type(contactDetails.name);
      cy.get('input[name="email"]').type(contactDetails.email);
      cy.get('input[name="phone"]').type(contactDetails.phone);
      cy.get('textarea[name="message"]').type(contactDetails.message);

      cy.get('input[value="Send to Customer Care"]').click();

      cy.contains(`Thank you ${contactDetails.name}`).should("be.visible");
    });
  });

  describe("Test Case 10.2. Validate Successful Submission Of Customer Care Requests From Bottom Navigation", () => {
    it("should successfully submit a customer care request from bottom navigation", () => {
      cy.contains("Contact Us").click();

      cy.url().should("include", "contact.htm");

      cy.get('input[name="name"]').type(contactDetails.name);
      cy.get('input[name="email"]').type(contactDetails.email);
      cy.get('input[name="phone"]').type(contactDetails.phone);
      cy.get('textarea[name="message"]').type(contactDetails.message);

      cy.get('input[value="Send to Customer Care"]').click();

      cy.contains(`Thank you ${contactDetails.name}`).should("be.visible");
    });
  });

  describe("Test Case 10.3. Validate Empty Submission Of Customer Care Requests From Bottom Navigation", () => {
    it("should display required warnings when no contact details are provided", () => {
      cy.contains("Contact Us").click();

      cy.url().should("include", "contact.htm");

      cy.get('input[value="Send to Customer Care"]').click();

      cy.contains("Name is required").should("be.visible");
      cy.contains("Email is required").should("be.visible");
      cy.contains("Phone is required").should("be.visible");
      cy.contains("Message is required").should("be.visible");
    });
  });
});
