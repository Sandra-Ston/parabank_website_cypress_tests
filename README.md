# ParaBank Website Cypress Tests

This repository contains Cypress end-to-end tests for the ParaBank website (https://parabank.parasoft.com/parabank/index.htm).

# ParaBank Website Cypress Tests

This repository contains Cypress end-to-end tests for the ParaBank website.

## Description

This project uses Cypress, a powerful end-to-end testing framework, to automate tests for the ParaBank demo website. The tests cover various functionalities of the website, ensuring its reliability and proper functioning.

## Getting Started

### Prerequisites

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

No specific configuration is needed. The `cypress.config.js` file contains the basic Cypress configuration.

### Running the Tests

You can run the tests in two ways:

1.  **Using the Cypress Test Runner (GUI):**

    ```
    npm run cypress:open
    # or
    yarn cypress:open
    ```

    This command opens the Cypress Test Runner, allowing you to interactively run the tests and view the results.

2.  **Running the tests in headless mode (command line):**

    ```
    npm run cypress:run
    # or
    yarn cypress:run
    ```

    This command runs the tests in the command line without the GUI. It's useful for CI/CD environments.

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

[Sandra-Ston](https://github.com/Sandra-Ston)
