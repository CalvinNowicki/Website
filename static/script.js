// Learn More button functionality
document.getElementById('learnMore').addEventListener('click', () => {
  alert('The Cash-First Financial Strategy helps you achieve financial independence by avoiding debt and rejecting traditional banking.');
});

// Savings Calculator
document.getElementById('calculate').addEventListener('click', () => {
  const income = parseFloat(document.getElementById('income').value);
  const expenses = parseFloat(document.getElementById('expenses').value);

  if (isNaN(income) || isNaN(expenses)) {
    document.getElementById('result').textContent = 'Please enter valid numbers.';
    return;
  }

  const savings = income - expenses;
  document.getElementById('result').textContent = savings >= 0
    ? `You can save $${savings.toFixed(2)} per month.`
    : `You are overspending by $${Math.abs(savings).toFixed(2)} per month.`;
});

// Quiz functionality
document.getElementById('startQuiz').addEventListener('click', () => {
  const quizContainer = document.getElementById('quizContainer');
  quizContainer.innerHTML = `
    <p>What is the main principle of the Cash-First Strategy?</p>
    <button onclick="checkAnswer('A')">A. Avoid Debt</button>
    <button onclick="checkAnswer('B')">B. Use Credit Scores</button>
    <button onclick="checkAnswer('C')">C. Borrow for Expenses</button>
  `;
});

function checkAnswer(choice) {
  const quizContainer = document.getElementById('quizContainer');
  if (choice === 'A') {
    quizContainer.innerHTML = '<p>Correct! The Cash-First Strategy emphasizes avoiding debt.</p>';
  } else {
    quizContainer.innerHTML = '<p>Incorrect. Try again!</p>';
  }
}

// Signup form functionality
document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  alert(`Thank you for signing up! Updates will be sent to ${email}`);
});
