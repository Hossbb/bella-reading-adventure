/*
📌 Purpose: Load the approved high-resolution artwork and make its answer cards interactive.
❓ Business Question: How can Bella select, check, retry, and complete the displayed question?
👉 She taps one answer, checks it, receives gentle feedback, and retries until she finds the clue.
🧠 Logic Summary:
1. Join the four high-resolution artwork data parts.
2. Replace the temporary low-resolution image.
3. Track Bella's selected answer.
4. Check whether the selected answer is B.
5. Give a calm retry after a mistake.
6. Lock the choices and celebrate after the correct answer.
*/

const CORRECT_ANSWER = "B";

let selectedAnswer = null;
let completed = false;

const answerButtons = [...document.querySelectorAll(".answer-hotspot")];
const checkButton = document.getElementById("checkButton");
const feedback = document.getElementById("feedback");
const feedbackText = document.getElementById("feedbackText");
const successBurst = document.getElementById("successBurst");
const worksheetArt = document.getElementById("worksheetArt");

/*
❓ What does this expression do? Why do we need it?
👉 It combines the four GitHub-hosted image-data files and loads the approved artwork at a much higher resolution than the temporary preview.
*/
if (window.__WORKSHEET_PARTS?.length === 4) {
  worksheetArt.src = `data:image/avif;base64,${window.__WORKSHEET_PARTS.join("")}`;
}

/*
❓ What does this expression do? Why do we need it?
👉 It removes old selection and incorrect-answer outlines before Bella makes another choice.
*/
function clearTransientStates() {
  answerButtons.forEach((button) => {
    button.classList.remove("selected", "wrong");
  });
}

/*
❓ What does this expression do? Why do we need it?
👉 It records Bella's current choice, outlines the complete illustrated answer card, and enables Check Answer.
*/
function selectAnswer(button) {
  if (completed) {
    return;
  }

  clearTransientStates();

  selectedAnswer = button.dataset.answer;
  button.classList.add("selected");

  checkButton.disabled = false;
  feedback.className = "feedback-overlay";
  feedbackText.textContent = "Tap Check Answer when you are ready.";
}

/*
❓ What does this expression do? Why do we need it?
👉 It compares Bella's selection with B, gives a gentle retry after a mistake, and celebrates the correct answer.
*/
function checkAnswer() {
  if (!selectedAnswer || completed) {
    return;
  }

  const selectedButton = answerButtons.find((button) => {
    return button.dataset.answer === selectedAnswer;
  });

  if (selectedAnswer === CORRECT_ANSWER) {
    completed = true;

    selectedButton.classList.remove("selected");
    selectedButton.classList.add("correct");

    answerButtons.forEach((button) => {
      button.disabled = true;
    });

    checkButton.disabled = true;
    feedback.className = "feedback-overlay is-correct";
    feedbackText.textContent = "Great reading! You found the clue.";
    successBurst.classList.add("show");

    window.setTimeout(() => {
      successBurst.classList.remove("show");
    }, 900);

    return;
  }

  selectedButton.classList.remove("selected");
  selectedButton.classList.add("wrong");

  feedback.className = "feedback-overlay is-wrong";
  feedbackText.textContent = "Good try. Look at the yellow clue.";

  selectedAnswer = null;
  checkButton.disabled = true;

  window.setTimeout(() => {
    selectedButton.classList.remove("wrong");
  }, 450);
}

answerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectAnswer(button);
  });
});

checkButton.addEventListener("click", checkAnswer);
