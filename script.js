function initQuiz(quiz, characterPool) {
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const submitBtn = document.getElementById('submit-btn');
  const resultEl = document.getElementById('result');
  const resultText = document.getElementById('result-text');
  const characterImg = document.getElementById('character-img');

  questionEl.textContent = quiz.question;
  optionsEl.innerHTML = "";

  quiz.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.className = "option-btn";
    btn.onclick = () => {
      optionsEl.querySelectorAll('button').forEach(b => b.disabled = true);
      checkAnswer(option);
    };
    optionsEl.appendChild(btn);
  });

  function checkAnswer(selected) {
    if(selected === quiz.answer){
      resultText.textContent = "Correct! You unlocked a character!";
      const randomChar = characterPool[Math.floor(Math.random() * characterPool.length)];
      characterImg.src = randomChar;
      saveCharacter(randomChar);
    } else {
      resultText.textContent = "Oops! Try again next time.";
      characterImg.style.display = "none";
    }
    resultEl.style.display = "block";
  }

  function saveCharacter(charSrc) {
    let collection = JSON.parse(localStorage.getItem("collection")) || [];
    if(!collection.includes(charSrc)) {
      collection.push(charSrc);
      localStorage.setItem("collection", JSON.stringify(collection));
    }
  }
}
