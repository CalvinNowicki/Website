// Add interactivity to the Learn More button
document.getElementById('learnMore').addEventListener('click', () => {
  alert('Discover a revolutionary financial system that prioritizes cash savings and avoids debt at all costs.');
});

// Savings calculator functionality
document.getElementById('calculate').addEventListener('click', () => {
  const income = parseFloat(document.getElementById('monthlyIncome').value);
  const expenses = parseFloat(document.getElementById('monthlyExpenses').value);

  if (isNaN(income) || isNaN(expenses)) {
    document.getElementById('result').textContent = 'Please enter valid numbers for income and expenses.';
    return;
  }

  const savings = income - expenses;
  document.getElementById('result').textContent = savings >= 0 
    ? `You can save $${savings.toFixed(2)} per month.` 
    : `You are overspending by $${Math.abs(savings).toFixed(2)} per month.`;
});

// Signup form submission
document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for joining the Cash-First Movement!');
});
