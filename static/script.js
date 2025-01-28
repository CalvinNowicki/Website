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

// Financial Roadmap Generator
document.getElementById('roadmapForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('roadmapName').value;
  const goal = document.getElementById('roadmapGoal').value;

  if (!name || !goal) {
    document.getElementById('roadmapResult').textContent = 'Please complete all fields.';
    return;
  }

  document.getElementById('roadmapResult').innerHTML = `
    <h3>${name}'s Financial Roadmap</h3>
    <p>Goal: ${goal}</p>
    <ol>
      <li>Create a monthly budget aligned with your goal.</li>
      <li>Set up an emergency fund with 6 months of living expenses.</li>
      <li>Explore investment options to grow your savings.</li>
    </ol>
  `;
});

// DeFi Animation
const canvas = document.getElementById('defiCanvas');
const ctx = canvas.getContext('2d');
let angle = 0;

function drawDeFi() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(200, 200, 100, angle, angle + Math.PI / 2);
  ctx.strokeStyle = '#008080';
  ctx.lineWidth = 5;
  ctx.stroke();
  angle += 0.05;
  requestAnimationFrame(drawDeFi);
}

drawDeFi();
