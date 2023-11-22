const readline = require('readline');

// Create a readline interface to get user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get user input as a number
function getUserInput(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(parseFloat(answer));
    });
  });
}

// Simple calculator object with basic operations
const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b !== 0 ? a / b : 'Cannot divide by zero'),
};

// Array to store available operations
const validOperations = ['add', 'subtract', 'multiply', 'divide'];

// Function to perform a calculation using a callback
function performCalculation(a, b, operation, callback) {
  return new Promise((resolve, reject) => {
    if (validOperations.includes(operation)) {
      const result = callback(calculator[operation], a, b);
      resolve(`Result: ${result}`);
    } else {
      reject('Invalid operation');
    }
  });
}

// Main function
async function main() {
  try {
    // Get user input for the first number
    const number1 = await getUserInput('Enter the first number: ');

    // Get user input for the second number
    const number2 = await getUserInput('Enter the second number: ');

    // Get user input for the operation
    const operationCode = await getUserInput('Enter operation code (1 for add, 2 for subtract, 3 for multiply, 4 for divide): ');

    // Convert the operation code to a valid operation
    const operation = validOperations[parseInt(operationCode) - 1];

    // Perform the calculation using a callback
    const callbackResult = await performCalculation(number1, number2, operation, (callback, a, b) => callback(a, b));

    console.log(callbackResult);
  } catch (error) {
    console.error(error);
  } finally {
    // Close the readline interface
    rl.close();
  }
}

// Run the main function
main();
