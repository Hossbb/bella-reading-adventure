/*
📌 Purpose: Make the approved worksheet answer cards and Check Answer button interactive.
❓ Business Question: How does Bella select, check, retry, and complete the displayed question?
👉 She taps one answer, checks it, receives gentle feedback, and can retry until she finds the clue.
🧠 Logic Summary:
1. Track Bella's selected answer.
2. Enable the check control after a selection.
3. Mark B as the correct answer.
4. Clear an incorrect selection and invite another try.
5. Lock the choices and celebrate after the correct answer.
*/

const CORRECT_ANSWER = "B";

let selectedAnswer = null;
let completed = false;

const answerButtons = [...document.querySelectorAll(".answer-hotspot")];
const checkButton = document.getElementById("checkButton");
const feedback = document.getElementById("feedback");
const feedbackText = document.getElementById("feedbackText");
const successBurst = document.getElementById("successBurst");
const worksheetArt = document.querySelector(".worksheet-art");

/*
❓ What does this expression do? Why do we need it?
👉 It joins the image-data files and loads the approved worksheet graphic without requiring a binary upload.
*/
if (window.BELLA_IMAGE_CHUNKS?.length) {
  worksheetArt.src = `data:image/webp;base64,${window.BELLA_IMAGE_CHUNKS.join("")}`;
}

/*
❓ What does this expression do? Why do we need it?
👉 It visually clears previous selections while preserving a completed correct state when necessary.
*/
function clearTransientStates() {
  answerButtons.forEach((button) => {
    button.classList.remove("selected", "wrong");
  });
}

/*
❓ What does this expression do? Why do we need it?
👉 It records Bella's current choice, highlights the complete illustrated card, and enables the Check Answer button.
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
👉 It compares Bella's choice with B, gives a calm retry after a mistake, and celebrates when she finds the correct answer.
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
