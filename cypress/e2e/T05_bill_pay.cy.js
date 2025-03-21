describe('5. Bill Pay', () => {
  
  beforeEach(() => {
    cy.fixture("user").then((data) => {
      const user = data.validUser;
      cy.restoreSession(user.username, user.password);

      cy.visitHomePage();
      cy.contains(`Welcome ${user.firstName} ${user.lastName}`).should("be.visible");
    });
  });

  describe('Test Case 5.1: Validate Successful Bill Payment', () => {
    
    it('should successfully pay a bill', () => {
      cy.contains('Bill Pay').click();
      cy.url().should('include', 'billpay.htm');
      cy.contains('Bill Payment Service').should('be.visible');

      const payee = {
        name: 'John Doe',
        address: '456 Main St',
        city: 'Calgary',
        state: 'Alberta',
        zipCode: 'T2P 2G7',
        phone: '9876543210',
        accountNumber: '123456789',
        amount: '50'
      };

      cy.get("input[name='payee.name']").type(payee.name);
      cy.get("input[name='payee.address.street']").type(payee.address);
      cy.get("input[name='payee.address.city']").type(payee.city);
      cy.get("input[name='payee.address.state']").type(payee.state);
      cy.get("input[name='payee.address.zipCode']").type(payee.zipCode);
      cy.get("input[name='payee.phoneNumber']").type(payee.phone);
      cy.get("input[name='payee.accountNumber']").type(payee.accountNumber);
      cy.get("input[name='verifyAccount']").type(payee.accountNumber);
      cy.get("input[name='amount']").type(payee.amount);
      
        cy.get("input[value='Send Payment']").click();

      cy.contains('Bill Payment Complete').should('be.visible');
      cy.contains(new RegExp(`Bill Payment to ${payee.name} in the amount of \\$?${payee.amount}(.00)? from account \\d+ was successful.`, "i"))
        .should('be.visible');

      cy.contains('Accounts Overview').click();
      cy.url().should('include', 'overview.htm');
      cy.get("#accountTable").should('be.visible');

      cy.get("#accountTable tbody tr").should('have.length.greaterThan', 1);
    });
  });

  describe('Test Case 5.2: Validate Unsuccessful Bill Payment', () => {
    
    it('should display an error for a negative bill payment amount', () => {
      cy.contains('Bill Pay').click();
      cy.url().should('include', 'billpay.htm');
      cy.contains('Bill Payment Service').should('be.visible');

      cy.get("input[name='payee.name']").type('Invalid Payee');
      cy.get("input[name='payee.address.street']").type('123 Fake St');
      cy.get("input[name='payee.address.city']").type('Nowhere');
      cy.get("input[name='payee.address.state']").type('ZZ');
      cy.get("input[name='payee.address.zipCode']").type('00000');
      cy.get("input[name='payee.phoneNumber']").type('1234567890');
      cy.get("input[name='payee.accountNumber']").type('999999');
      cy.get("input[name='verifyAccount']").type('999999');
      cy.get("input[name='amount']").type('-500');

      cy.get("input[value='Send Payment']").click();

      
      cy.contains('Please enter a valid amount').should('be.visible');
    });
  });

  describe('Test Case 5.3: Validate Empty Bill Payment', () => {
    
    it('should display required field warnings when bill payment form is empty', () => {
      cy.contains('Bill Pay').click();
      cy.url().should('include', 'billpay.htm');
      cy.contains('Bill Payment Service').should('be.visible');

      cy.get("input[value='Send Payment']").click();

      cy.contains('Payee name is required.').should('be.visible');
      cy.contains('Address is required.').should('be.visible');
      cy.contains('City is required.').should('be.visible');
      cy.contains('State is required.').should('be.visible');
      cy.contains('Zip Code is required.').should('be.visible');
      cy.contains('Phone number is required.').should('be.visible');
      cy.contains('Account number is required.').should('be.visible');
      cy.contains('The amount cannot be empty').should('be.visible');
    });
  });
});

