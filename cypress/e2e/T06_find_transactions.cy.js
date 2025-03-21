describe("6. Find Transactions", () => {
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

    cy.contains("Find Transactions").click();
    cy.url().should("include", "findtrans.htm");
  });

  describe("Test Case 6.1. Verify Search Results Match The Entered Criteria - ID", () => {
    it("should search for a transaction using a valid ID and display matching results", () => {
      cy.contains("Accounts Overview").click();
      cy.get("table tbody tr td a").first().click();
      cy.contains("Funds Transfer Sent").first().click();

      cy.url().then((url) => {
        const transactionId = url.split("id=")[1];

        cy.get('a[href*="findtrans.htm"]').click();
        cy.get("#transactionForm").should("be.visible");
        cy.get("#transactionId").clear().type(transactionId);
        cy.get("#findById").click();
        cy.contains(transactionId).should("be.visible");
      });
    });
  });

  describe("Test Case 6.2. Validate Incorrect Search For Transaction By ID", () => {
    it("should display an error when an invalid transaction ID is entered", () => {
      cy.get('a[href*="findtrans.htm"]').click();
      cy.get("#transactionForm").should("be.visible");

      cy.get("#transactionId").clear().type("qwerty");
      cy.get("#findById").click();

      cy.get("#transactionIdError").should("contain", "Invalid transaction ID");
    });
  });

  describe("Test Case 6.3. Validate Empty Search For Transaction By ID", () => {
    it("should display a required field warning when no transaction ID is entered", () => {
      cy.get('a[href*="findtrans.htm"]').click();
      cy.get("#transactionForm").should("be.visible");

      cy.get("#findById").click();

      cy.get("#transactionIdError").should("contain", "Invalid transaction ID");
    });
  });

  describe("Test Case 6.4. Verify Search Results Match The Entered Criteria - Date", () => {
    it("should search for transactions using a valid date and display matching results", () => {
      const today = new Date();
      const formattedDate = `${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today
        .getDate()
        .toString()
        .padStart(2, "0")}-${today.getFullYear()}`;

      cy.get('a[href*="findtrans.htm"]').click();
      cy.get("#transactionForm").should("be.visible");

      cy.get("#transactionDate").clear().type(formattedDate);
      cy.get("#findByDate").click();

      cy.get("#transactionTable").should("be.visible");
      cy.get("#transactionTable").contains(formattedDate).should("be.visible");
      cy.get("#transactionTable")
        .contains("Funds Transfer Received")
        .should("be.visible");
    });
  });

  describe("Test Case 6.5. Validate Incorrect Search For Transaction By Date", () => {
    it("should display an error when an invalid date is entered", () => {
      cy.get('a[href*="findtrans.htm"]').click();
      cy.get("#transactionForm").should("be.visible");

      cy.get("#transactionDate").clear().type("99-99-9999");
      cy.get("#findByDate").click();

      cy.get("#transactionDateError").should("contain", "Invalid date format");
    });
  });

  describe("Test Case 6.6. Validate Empty Search For Transaction by Date", () => {
    it("should display a required field warning when no date is entered", () => {
      cy.get('a[href*="findtrans.htm"]').click();
      cy.get("#transactionForm").should("be.visible");

      cy.get("#findByDate").click();

      cy.get("#transactionDateError").should("contain", "Invalid date format");
    });
  });

  describe("Test Case 6.7. Verify Search Results Match The Entered Criteria - Date Range", () => {
    it("should search for transactions using a valid date range and display matching results", () => {
      const today = new Date();
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(today.getDate() - 3);

      const formatDate = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
      };

      const formattedToday = formatDate(today);
      const formattedThreeDaysAgo = formatDate(threeDaysAgo);

      cy.get('a[href*="findtrans.htm"]').click();
      cy.get("#transactionForm").should("be.visible");

      cy.get("#fromDate").clear().type(formattedThreeDaysAgo);
      cy.get("#toDate").clear().type(formattedToday);
      cy.get("#findByDateRange").click();

      cy.get("#transactionTable").should("be.visible");
      cy.get("#transactionTable").contains(formattedToday).should("be.visible");
      cy.get("#transactionTable")
        .contains("Funds Transfer Received")
        .should("be.visible");
    });
  });

  describe("Test Case 6.8. Validate Incorrect Search For Transaction By Date Range", () => {
    it("should display an error when an invalid date range is entered", () => {
      cy.get('a[href*="findtrans.htm"]').click();
      cy.get("#transactionForm").should("be.visible");

      cy.get("#fromDate").clear().type("99-99-9999");
      cy.get("#toDate").clear().type("99-99-9999");
      cy.get("#findByDateRange").click();

      cy.get("#dateRangeError").should("contain", "Invalid date format");
    });
  });

  describe("Test Case 6.9. Validate Empty Search For Transaction by Date Range", () => {
    it("should display a required field warning when no date range is entered", () => {
      cy.get('a[href*="findtrans.htm"]').click();
      cy.get("#transactionForm").should("be.visible");

      cy.get("#findByDateRange").click();

      cy.get("#dateRangeError").should("contain", "Invalid date format");
    });
  });

  describe("Test Case 6.10. Verify Search Results Match The Entered Criteria - Amount", () => {
    it("should search for transactions using a valid amount and display matching results", () => {
      cy.get('a[href*="findtrans.htm"]').click();
      cy.get("#transactionForm").should("be.visible");

      cy.get("#amount").clear().type("100.00");
      cy.get("#findByAmount").click();

      cy.get("#transactionTable").should("be.visible");
      cy.get("#transactionTable")
        .contains("Funds Transfer Received")
        .should("be.visible");
      cy.get("#transactionTable").contains("100.00").should("be.visible");
    });
  });

  describe("Test Case 6.11. Validate Incorrect Search For Transaction By Amount", () => {
    it("should display an error when an invalid amount is entered", () => {
      cy.get('a[href*="findtrans.htm"]').click();
      cy.get("#transactionForm").should("be.visible");

      cy.get("#amount").clear().type("abcdef");
      cy.get("#findByAmount").click();

      cy.get("#amountError").should("contain", "Invalid amount");
    });
  });

  describe("Test Case 6.12. Validate Empty Search For Transaction By Amount", () => {
    it("should display a required field warning when no amount is entered", () => {
      cy.get('a[href*="findtrans.htm"]').click();
      cy.get("#transactionForm").should("be.visible");

      cy.get("#findByAmount").click();

      cy.get("#amountError").should("contain", "Invalid amount");
    });
  });
});
