async function loadQuestions() {
  const API_KEY = "api key"; // replace with your Gemini key
  const topic = window.QUIZ_TOPIC || "Water Pollution";
 // can be dynamic

  const prompt = `
Generate 5 multiple-choice quiz questions on "${topic}". 
Format strictly as a JavaScript array of objects like this:

[
  { q: "Sample question?", opts: ["Option1","Option2","Option3","Option4"], correct: 0 }
]

Rules:
- Give different questions each time.
- Each object must have: q (string), opts (array of strings), correct (index).
- Output ONLY valid JSON (no code fences or extra text).
`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await res.json();
    let rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    // Clean possible code fences
    rawText = rawText.replace(/```(json)?/g, "").trim();

    // Parse JSON and replace QUESTIONS
    QUESTIONS = JSON.parse(rawText);

// Start the quiz only now
startQuiz();  // define startQuiz() in quizpractice.js


    console.log("AI-generated QUESTIONS:", QUESTIONS);
  } catch (err) {
    console.error("Failed to load questions:", err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadQuestions(); // safe, quizpractice.js should have run by now
});


// This must be in global scope

