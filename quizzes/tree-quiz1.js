const QUESTIONS = [
  { q: `Which of these trees is known as the "oxygen factory"?`, opts: ["Banyan", "Neem", "Peepal", "Mango"], correct: 2 },
  { q: `Which tree’s leaf is this? (Peepal/Neem/Mango)`, opts: ["Peepal", "Neem", "Mango"], correct: 2 },
  { q: `Planting which type of trees can help reduce air pollution the most?`, opts: ["Evergreen trees", "Desert shrubs", "Short grasses", "Cactus"], correct: 0 },
  { q: `Cutting trees near rivers increases the risk of floods.`, opts: ["True", "False"], correct: 0 },
  { q: `Which city is known as the "Garden City of India"?`, opts: ["Jaipur", "Bengaluru", "Lucknow", "Bhopal"], correct: 1 }
];

// DOM refs (some may be undefined depending on your HTML; we handle that)
const container = document.getElementById("quiz-container");
const progressBar = document.getElementById("progressBar");          // optional progress bar
const progressText = document.getElementById("progressText") || document.getElementById("progress") || null;
const restartBtn = document.getElementById("restartBtn");
const collectionBtn = document.getElementById("collectionBtn");     // optional

// Try to find streak/health elements by several common names (id or class)
const streakEl = document.getElementById('streak') 
               || document.getElementById('streakCount') 
               || document.querySelector('.streak')
               || null;

const healthEl = document.getElementById('health') 
              || document.getElementById('healthCount') 
              || document.querySelector('.health')
              || null;

// state
let idx = 0;
let health = 3; // start of each quiz session
let streak = parseInt(localStorage.getItem("streak")) || 0;
let lastCheckIn = localStorage.getItem("lastCheckIn") || null;

// helper: safe text setter
function safeSetText(el, txt){
  if(!el) return;
  // if it's a span that already contains an emoji, set only the number if possible
  el.textContent = txt;
}

// daily check-in logic (call once on load)
function dailyCheckIn(){
  const today = new Date().toDateString();
  if (lastCheckIn !== today){
    streak++;
    localStorage.setItem('streak', streak);
    localStorage.setItem('lastCheckIn', today);
    lastCheckIn = today;
  }
  updateUI();
}

// update visible UI (non-throwing)
function updateUI(){
  try {
    // show streak like "🔥 4" or "4" depending on element content
    if(streakEl){
      // if the element already contains emoji, keep emoji and number
      if (streakEl.textContent && streakEl.textContent.trim().startsWith('🔥')) {
        streakEl.textContent = `🔥 ${streak}`;
      } else {
        streakEl.textContent = `${streak}`;
      }
    }
    if(healthEl){
      if (healthEl.textContent && healthEl.textContent.trim().startsWith('❤️')) {
        healthEl.textContent = `❤️ ${health}`;
      } else {
        healthEl.textContent = `${health}`;
      }
    }
    // progress bar/text (if present)
    if(progressBar) {
      const pct = Math.round((idx / QUESTIONS.length) * 100);
      progressBar.style.width = pct + '%';
    }
    if(progressText){
      progressText.textContent = idx < QUESTIONS.length ? `Q${idx+1}/${QUESTIONS.length}` : 'Completed';
    }
  } catch(err) {
    // silently ignore UI update errors to avoid breaking interaction
    console.warn("UI update failed:", err);
  }
}

// render question at index i
function renderQuestion(i){
  if(!container){
    console.error("No quiz container found in DOM.");
    return;
  }

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
    // accessible label inside
    btn.innerHTML = `<span style="font-weight:600;margin-right:6px">${String.fromCharCode(65+oi)}.</span> ${opt}`;
    btn.dataset.index = oi;
    // handle click
    btn.addEventListener('click', () => optionClicked(btn, oi, data.correct));
    optsWrap.appendChild(btn);
  });

  container.appendChild(optsWrap);
  updateUI();
}

// called when an option is clicked
function optionClicked(button, chosenIndex, correctIndex){
  if (!container) return;
  if (container.dataset.locked === '1') return;

  if (chosenIndex === correctIndex){
    // correct answer
    try {
      button.classList.add('success');
      container.classList.add('success');
      container.dataset.locked = '1';
    } catch(e){ /* ignore */ }

    // progress to next after a short delay
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
    // wrong answer: decrease health first
    health = Math.max(0, health - 1);
    updateUI();

    // disable that option and show shake
    try {
      button.disabled = true;
      button.style.opacity = '0.7';
      container.classList.add('shake');
      setTimeout(() => container.classList.remove('shake'), 300);
    } catch(e){ /* ignore */ }

    // check for game over
    if (health <= 0){
      // small delay to show shake feedback, then show game over
      setTimeout(() => {
        showGameOver();
      }, 350);
    }
  }
}

function showFinal(){
  // Find quiz type from URL query (?type=tree etc.)
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type") || "tree";

  // Award a character
  const reward = awardCharacter(type);

  container.innerHTML = `
    <div class="final">
      <h2>🎉 All done!</h2>
      <p>You completed the quiz.</p>
      <p style="margin-top:12px">
        You unlocked: <strong>${reward.character}</strong><br>
        Rarity: ${reward.rarity}, Level: ${reward.level}
      </p>
    </div>
  `;
  progressEl.textContent = `Completed`;
  restartBtn.style.display = 'inline-block';
  container.style.pointerEvents = 'none';
}


// game over screen
function showGameOver(){
  if(!container) return;
  container.innerHTML = `
    <div class="final">
      <h2>💀 Game Over</h2>
      <p>You ran out of health. Try again!</p>
    </div>
  `;
  updateUI();
  if(restartBtn) restartBtn.style.display = 'inline-block';
  if(collectionBtn) collectionBtn.style.display = 'none';
}

// restart helper
function restartQuiz(){
  idx = 0;
  health = 3;
  if(restartBtn) restartBtn.style.display = 'none';
  if(collectionBtn) collectionBtn.style.display = 'none';
  renderQuestion(idx);
  updateUI();
}

// wire restart button if present
if (restartBtn) {
  restartBtn.addEventListener('click', restartQuiz);
}

// daily check-in on load and init quiz
window.addEventListener('DOMContentLoaded', () => {
  // ensure streak is recorded once per day
  const today = new Date().toDateString();
  if (lastCheckIn !== today){
    streak = (parseInt(localStorage.getItem("streak")) || 0) + 1;
    lastCheckIn = today;
    localStorage.setItem('streak', streak);
    localStorage.setItem('lastCheckIn', today);
  } else {
    streak = parseInt(localStorage.getItem("streak")) || streak;
  }

  // reset health per session
  health = 3;
  // init UI and first question
  renderQuestion(idx);
  updateUI();
});
