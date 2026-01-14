/* quiz.js — shared quiz engine
   Expects QUIZ_TYPE and QUESTIONS to be defined before this script runs.
   Handles: rendering questions, streak/health UI, game over, final + optional reward modal.
*/


function startQuiz() {
  if (!QUESTIONS || QUESTIONS.length === 0) {
    console.error("No QUESTIONS available to start the quiz.");
    return;
  }
  idx = 0;
  health = 3;
  renderQuestion(idx);
  updateUI();
}



(function () {
  // Safety checks
  if (typeof QUESTIONS === "undefined") {
    console.error("quiz.js: QUESTIONS is not defined on this page.");
    return;
  }
  if (typeof QUIZ_TYPE === "undefined") {
    console.warn("quiz.js: QUIZ_TYPE not defined — defaulting to 'default'.");
    window.QUIZ_TYPE = "default";
  }

  // DOM refs
  const container = document.getElementById("quiz-container");
  const progressEl = document.getElementById("progress");
  const restartBtn = document.getElementById("restartBtn");
  const collectionBtn = document.getElementById("collectionBtn") || null;

  const streakEl = document.querySelector(".streak") || null;
  const healthEl = document.querySelector(".health") || null;

  // optional reward modal (quiz will use if present)
  const modal = document.getElementById("reward-modal") || null;
  const modalImg = modal ? modal.querySelector("#reward-img") : null;
  const modalName = modal ? modal.querySelector("#reward-name") : null;
  const modalClose = modal ? (modal.querySelector("#closeReward") || modal.querySelector(".close-btn")) : null;
  const modalGo = modal ? (modal.querySelector("#goCollectionBtn") || null) : null;

  // State
  let idx = 0;
  let health = 3; // reset per-session
  let streak = parseInt(localStorage.getItem("streak")) || 0;
  let lastCheckIn = localStorage.getItem("lastCheckIn") || null;

  // Safe UI setter
  function safeSetText(el, txt) {
    if (!el) return;
    el.textContent = txt;
  }

  // Daily check-in (call once)
  function dailyCheckIn() {
    const today = new Date().toDateString();
    if (lastCheckIn !== today) {
      streak = (parseInt(localStorage.getItem("streak")) || 0) + 1;
      lastCheckIn = today;
      localStorage.setItem("streak", streak);
      localStorage.setItem("lastCheckIn", today);
    } else {
      streak = parseInt(localStorage.getItem("streak")) || streak;
    }
    updateUI();
  }

  // Update UI (streak, health, progress text)
  function updateUI() {
    try {
      if (streakEl) {
        if (streakEl.textContent && streakEl.textContent.trim().startsWith("🔥")) {
          streakEl.textContent = `🔥 ${streak}`;
        } else {
          streakEl.textContent = `${streak}`;
        }
      }
      if (healthEl) {
        if (healthEl.textContent && healthEl.textContent.trim().startsWith("❤️")) {
          healthEl.textContent = `❤️ ${health}`;
        } else {
          healthEl.textContent = `${health}`;
        }
      }
      if (progressEl) {
        progressEl.textContent = idx < QUESTIONS.length ? `Q${idx + 1}/${QUESTIONS.length}` : "Completed";
      }
    } catch (e) {
      // don't break the quiz for UI errors
      console.warn("updateUI error", e);
    }
  }

  // Render a question at index i
  function renderQuestion(i) {
    if (!container) return;
    container.classList.remove("success", "shake");
    container.style.pointerEvents = "auto";
    container.innerHTML = "";

    const data = QUESTIONS[i];
    const qText = document.createElement("div");
    qText.className = "question-text";
    qText.textContent = data.q || data.question || ("Question " + (i + 1));
    container.appendChild(qText);

    const optsWrap = document.createElement("div");
    optsWrap.className = "options";

    (data.opts || data.options || []).forEach((opt, oi) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.innerHTML = `<span style="font-weight:600;margin-right:6px">${String.fromCharCode(65 + oi)}.</span> ${opt}`;
      btn.dataset.index = oi;
      btn.addEventListener("click", () => optionClicked(btn, oi, data.correct));
      optsWrap.appendChild(btn);
    });

    container.appendChild(optsWrap);
    updateUI();
  }
// expose globally BEFORE AI calls startQuiz
window.updateUI = updateUI;
window.renderQuestion = renderQuestion;
window.startQuiz = function() {
  if (QUESTIONS.length > 0) renderQuestion(0);
};



  // Option clicked
  function optionClicked(button, chosenIndex, correctIndex) {
    if (!container) return;
    if (container.dataset.locked === "1") return;

    if (chosenIndex === correctIndex) {
      // correct
      try {
        button.classList.add("success");
        container.classList.add("success");
        container.dataset.locked = "1";
      } catch (e) {}
      setTimeout(() => {
        idx++;
        container.dataset.locked = "0";
        if (idx < QUESTIONS.length) {
          renderQuestion(idx);
        } else {
          showFinal();
        }
      }, 600);
    } else {
      // wrong
      health = Math.max(0, health - 1);
      updateUI();
      try {
        button.disabled = true;
        button.style.opacity = "0.7";
        container.classList.add("shake");
        setTimeout(() => container.classList.remove("shake"), 300);
      } catch (e) {}
      if (health <= 0) {
        setTimeout(showGameOver, 350);
      }
    }
  }

  // Show final / award
function showFinal() {
  const type = (typeof QUIZ_TYPE !== "undefined") ? QUIZ_TYPE : "default";
  const reward = (typeof awardCharacter === "function") 
    ? awardCharacter(type) 
    : { character: "unknown.png", rarity: "common", level: 1 };

  // update modal content
  const modal = document.getElementById("reward-modal");
  document.getElementById("reward-img").src = reward.character;
  document.getElementById("reward-name").textContent = 
    `${reward.rarity.toUpperCase()} • Level ${reward.level}`;

  // show modal
  modal.hidden = false;

  // close modal
  document.getElementById("closeReward").onclick = () => {
    modal.hidden = true;
  };

  // View Collection button
  document.getElementById("viewCollection").onclick = () => {
    window.location.href = "collection.html";
  };


  // restart button also visible under quiz
  document.getElementById("restartBtn").style.display = "inline-block";
}


  // Game over
  function showGameOver() {
    if (!container) return;
    container.innerHTML = `
      <div class="final">
        <h2>💀 Game Over</h2>
        <p>You ran out of health. Try again!</p>
      </div>
    `;
    updateUI();
    if (restartBtn) restartBtn.style.display = "inline-block";
    if (collectionBtn) collectionBtn.style.display = "none";
  }

  // Restart
  function restartQuiz() {
    idx = 0;
    health = 3;
    if (restartBtn) restartBtn.style.display = "none";
    if (collectionBtn) collectionBtn.style.display = "none";
    renderQuestion(idx);
    updateUI();
  }

  if (restartBtn) restartBtn.addEventListener("click", restartQuiz);

  // Init on DOMContentLoaded
  /*
  window.addEventListener("DOMContentLoaded", () => {
    dailyCheckIn();
    health = 3;
    renderQuestion(idx);
    updateUI();
  });
*/
  window.addEventListener("DOMContentLoaded", () => {
  dailyCheckIn();
  health = 3;
  updateUI();
  // renderQuestion(idx);  <-- removed
  });


  // Expose some helpers for debugging (optional)
  window._qrQuiz = {
    renderQuestion, optionClicked, showFinal, showGameOver, restartQuiz
  };
})();


