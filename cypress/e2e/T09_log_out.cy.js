describe("9. Log Out", () => {
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
   
    describe("Test Case 9.1 Validate Customer Log Out", () => {
      it("should log out the customer and display the home page", () => {
        cy.contains("Log Out").click();
        cy.contains("Customer Login").should("be.visible");
      });
    });
  });