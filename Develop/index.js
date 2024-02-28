const inquirer = require('inquirer');
const fs = require('fs');

// Function to generate the Table of Contents based on the user's input
function generateTableOfContents(answers) {
    let tableOfContents = '## Table of Contents\n';
    if (answers.installation !== '') tableOfContents += `- [Installation](#installation)\n`;
    if (answers.usage !== '') tableOfContents += `- [Usage](#usage)\n`;
    if (answers.contributing !== '') tableOfContents += `- [Contributing](#contributing)\n`;
    if (answers.tests !== '') tableOfContents += `- [Tests](#tests)\n`;
    tableOfContents += `- [License](#license)\n`;
    tableOfContents += `- [Questions](#questions)\n`;
    return tableOfContents;
}

// Function to generate README content
function generateREADME(answers) {
    const tableOfContents = generateTableOfContents(answers);

    // Badge based on chosen license
    let licenseBadge = '';
    if (answers.license !== 'None') {
        licenseBadge = `[![License](https://img.shields.io/badge/License-${answers.license}-brightgreen.svg)](https://opensource.org/licenses/${answers.license})`;
    }

    return `
# ${answers.projectTitle}

${licenseBadge}

## Description
${answers.description}

${tableOfContents}

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## License
This application is covered under the ${answers.license} license.

## Questions
For additional questions, you can reach me via:
- GitHub: [${answers.github}](https://github.com/${answers.github})
- Email: ${answers.email}
`;
}

// Array of questions
const questions = [
    {
        type: 'input',
        name: 'projectTitle',
        message: 'What is the title of your project?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a brief description of your project:'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Provide installation instructions:'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide usage information:'
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Provide contribution guidelines:'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Provide test instructions:'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-2-Clause', 'BSD-3-Clause', 'None']
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:'
    }
];

// Inquirer prompt
inquirer.prompt(questions)
    .then((answers) => {
        const READMEContent = generateREADME(answers);
        fs.writeFileSync('README.md', READMEContent);
        console.log('README.md successfully generated!');
    })
    .catch((error) => {
        console.error('Error occurred:', error);
    });

