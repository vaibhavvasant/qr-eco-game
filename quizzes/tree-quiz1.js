const QUESTIONS = [
  {
    q: `Which of these trees is known as the "oxygen factory"?`,
    opts: ["Banyan", "Neem", "Peepal", "Mango"],
    correct: 2
  },
  {
    q: `Which tree’s leaf is this? (Peepal/Neem/Mango)`,
    opts: ["Peepal", "Neem", "Mango"],
    correct: 2
  },
  {
    q: `Planting which type of trees can help reduce air pollution the most?`,
    opts: ["Evergreen trees", "Desert shrubs", "Short grasses", "Cactus"],
    correct: 0
  },
  {
    q: `Cutting trees near rivers increases the risk of floods.`,
    opts: ["True", "False"],
    correct: 0
  },
  {
    q: `Which city is known as the "Garden City of India"?`,
    opts: ["Jaipur", "Bengaluru", "Lucknow", "Bhopal"],
    correct: 1
  }
];

// DOM refs
const container = document.getElementById('quiz-container');
const progressEl = document.getElementById('progress');
const restartBtn = document.getElementById('restartBtn');

let idx = 0; // current question index

function renderQuestion(i){
  container.classList.remove('success','shake');
  container.style.pointerEvents = 'auto';
  container.innerHTML = '';

  const data = QUESTIONS[i];
  const qText = document.createElement('div');
  qText.className = 'question-text';
  qText.textContent = data.q;
  container.appendChild(qText);

  const optsWrap = document.createElement('div');
  optsWrap.className = 'options';
  data.opts.forEach((opt, oi) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.innerHTML = `<span style="font-weight:600;margin-right:6px">${String.fromCharCode(65+oi)}.</span> ${opt}`;
    btn.dataset.index = oi;
    btn.addEventListener('click', () => optionClicked(btn, oi, data.correct));
    optsWrap.appendChild(btn);
  });
  container.appendChild(optsWrap);

  progressEl.textContent = `Question ${i+1} of ${QUESTIONS.length}`;
}

function optionClicked(button, chosenIndex, correctIndex){
  if (container.dataset.locked === '1') return;

  if (chosenIndex === correctIndex){
    button.classList.add('success');
    container.classList.add('success');
    container.dataset.locked = '1';
    setTimeout(() => {
      idx++;
      container.dataset.locked = '0';
      if (idx < QUESTIONS.length){
        renderQuestion(idx);
      } else {
        showFinal();
      }
    }, 600);
  } else {
    button.disabled = true;
    button.style.opacity = '0.7';
    container.classList.add('shake');
    setTimeout(() => container.classList.remove('shake'), 300);
  }
}

function showFinal(){
  container.innerHTML = `
    <div class="final">
      <h2>🎉 All done!</h2>
      <p>You completed the quiz.</p>
      <p style="margin-top:12px">You unlocked: <strong>Tree Guardian 🌳</strong></p>
    </div>
  `;
  progressEl.textContent = `Completed`;
  restartBtn.style.display = 'inline-block';
  container.style.pointerEvents = 'none';
}

restartBtn.addEventListener('click', () => {
  idx = 0;
  restartBtn.style.display = 'none';
  renderQuestion(idx);
});

// init
renderQuestion(idx);
