# ParaBank Website Cypress Tests

This repository contains **Cypress** end-to-end tests for the [ParaBank website](https://parabank.parasoft.com/parabank/index.htm), a demo banking application designed for testing purposes.


## Description

This project utilizes [Cypress](https://www.cypress.io/), a modern end-to-end testing framework, to automate functional tests for the ParaBank website. The test suite covers essential banking features, including:

    ✅ User authentication (login/logout)
    ✅ Account creation & management
    ✅ Funds transfers & bill payments
    ✅ General website functionality testing

The goal is to ensure the reliability, stability, and proper functionality of the ParaBank website.

## Getting Started

### Prerequisites

Ensure you have the following installed before running the tests:

*   [Node.js](https://nodejs.org/) (version 14 or higher)
*   [npm](https://www.npmjs.com/) (Node Package Manager) or [Yarn](https://yarnpkg.com/)

### Installation

1.  Clone the repository:

    ```
    git clone https://github.com/Sandra-Ston/parabank_website_cypress_tests.git
    cd parabank_website_cypress_tests
    ```
2.  Install the dependencies:

    ```
    npm install
    # or
    yarn install
    ```

### Configuration

No additional configuration is required. The default settings in `cypress.config.js` define the necessary test execution parameters. You can modify this file to adjust browser settings, environment variables, or reporting options as needed.

### Running the Tests

You can run the tests in two ways:

1.  **Run tests using the Cypress Test Runner (GUI)**
   This opens Cypress in interactive mode, allowing you to select and run tests visually.

    ```
    npm run cypress:open
    # or
    yarn cypress:open
    ```

2.  **Run tests in headless mode (command line)**
   This runs the tests without opening the GUI, making it ideal for automation and CI/CD pipelines.

    ```
    npm run cypress:run
    # or
    yarn cypress:run
    ```

## Project Structure

*   `.github/workflows`: Contains GitHub Actions workflows for continuous integration.
*   `cypress`: Contains all Cypress-related files.
    *   `e2e`: Contains the test files (`.cy.js` files).
    *   `fixtures`: Contains test data.
    *   `support`: Contains reusable commands and functions.
*   `.gitignore`: Specifies intentionally untracked files that Git should ignore.
*   `cypress.config.js`: Cypress configuration file.
*   `package-lock.json`: Records the exact versions of the dependencies.
*   `package.json`: Contains project metadata and dependencies.
*   `parabank_website_functions.txt`: Contains list of website functions.
*   `parabank_website_test_cases.txt`: Contains list of test cases.

## Test Cases

The test cases for the ParaBank website are defined in `parabank_website_test_cases.txt`. The test implementation are located in `cypress/e2e/`.

## License

This project is licensed under the ISC License. See the [LICENSE](License) file for details.

## Author

Developed and maintained by [Sandra-Ston](https://github.com/Sandra-Ston)
