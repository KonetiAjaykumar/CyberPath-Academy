/* ==========================================================================
   CYBERPATH ACADEMY - Lesson Quiz Engine
   ========================================================================== */

import { db } from "../state.js";
import { ui } from "../ui.js";

export function initQuiz(pathId, module) {
    const sandbox = document.getElementById("quiz-sandbox");
    if (!sandbox) return;

    const quiz = module.quiz;
    if (!quiz) {
        sandbox.innerHTML = `
            <div style="text-align:center; padding:15px; color:var(--text-muted);">
                <p>No assessment configured for this intro module.</p>
                <button class="cyber-btn cyber-btn-green" id="btn-skip-quiz" style="margin-top:15px; width:100%;">
                    <i class="fa-solid fa-flag"></i> Complete Module
                </button>
            </div>
        `;
        document.getElementById("btn-skip-quiz").addEventListener("click", () => {
            db.completeLesson(pathId, module.id);
            document.getElementById("task-quiz").classList.add("completed");
            document.querySelector("#task-quiz i").className = "fa-solid fa-square-check";
            ui.showToast("Module completed successfully!", "success");
        });
        return;
    }

    // Default State variables
    let selectedOptionIndex = null;
    let submitted = false;

    function render() {
        sandbox.innerHTML = `
            <div class="quiz-container">
                <h3 class="cyber-title-sm" style="font-size:1.15rem;"><i class="fa-solid fa-circle-question"></i> Knowledge Check</h3>
                <p class="quiz-progress-text" style="margin-top:10px; margin-bottom:12px;">Verify security understanding</p>
                
                <div class="quiz-question-text">
                    ${quiz.question}
                </div>

                <div class="mcq-options-list">
                    ${quiz.options.map((opt, idx) => {
                        let stateClass = "";
                        if (submitted) {
                            if (idx === quiz.answer) stateClass = "correct";
                            else if (idx === selectedOptionIndex) stateClass = "incorrect";
                        } else {
                            if (idx === selectedOptionIndex) stateClass = "selected";
                        }

                        return `
                            <div class="mcq-option ${stateClass}" data-idx="${idx}">
                                <div class="option-letter">${String.fromCharCode(65 + idx)}</div>
                                <span>${opt}</span>
                            </div>
                        `;
                    }).join("")}
                </div>

                <!-- Feedback Area -->
                <div id="quiz-feedback" class="quiz-feedback-box"></div>

                <div style="margin-top: 20px;">
                    ${submitted ? `
                        <button class="cyber-btn cyber-btn-green" id="btn-quiz-next" style="width: 100%;">
                            <i class="fa-solid fa-square-check"></i> Complete & Continue
                        </button>
                    ` : `
                        <button class="cyber-btn cyber-btn-blue" id="btn-quiz-submit" style="width: 100%;" ${selectedOptionIndex === null ? 'disabled' : ''}>
                            <i class="fa-solid fa-circle-check"></i> Verify Answer
                        </button>
                    `}
                </div>
            </div>
        `;

        // Bind Option clicks
        if (!submitted) {
            sandbox.querySelectorAll(".mcq-option").forEach(el => {
                el.addEventListener("click", () => {
                    selectedOptionIndex = parseInt(el.getAttribute("data-idx"));
                    render(); // Re-render to show selected active outline
                });
            });

            document.getElementById("btn-quiz-submit").addEventListener("click", () => {
                if (selectedOptionIndex === null) return;
                submitted = true;
                
                const isCorrect = selectedOptionIndex === quiz.answer;
                const feedbackBox = document.getElementById("quiz-feedback");
                
                if (isCorrect) {
                    feedbackBox.className = "quiz-feedback-box correct-feedback";
                    feedbackBox.innerHTML = `
                        <strong><i class="fa-solid fa-circle-check"></i> Correct Response!</strong>
                        <p style="font-size:0.85rem; margin-top:5px;">${quiz.explanation}</p>
                    `;
                    // Mark lesson completed
                    const res = db.completeLesson(pathId, module.id);
                    db.submitQuizScore(pathId, module.id, 100);
                    
                    // Update checklist item visual indicators
                    document.getElementById("task-quiz").classList.add("completed");
                    document.querySelector("#task-quiz i").className = "fa-solid fa-square-check";

                    if (res && res.firstTime) {
                        ui.showToast(`Test passed! Earned +50 XP.`, "success");
                        if (res.xpResult && res.xpResult.leveledUp) {
                            ui.showToast(`Level up! You are now level ${res.xpResult.newLevel}!`, "success");
                        }
                    }
                } else {
                    feedbackBox.className = "quiz-feedback-box incorrect-feedback";
                    feedbackBox.innerHTML = `
                        <strong><i class="fa-solid fa-circle-xmark"></i> Vulnerability Found in Logic!</strong>
                        <p style="font-size:0.85rem; margin-top:5px;">Incorrect answer. Read the explanation below:<br>${quiz.explanation}</p>
                    `;
                    db.submitQuizScore(pathId, module.id, 0); // Save failed score
                    ui.showToast("Test failed. Try again to lock in XP!", "error");
                }

                render(); // Re-render to lock in correct/incorrect visual status
            });
        } else {
            // Next lesson button listener
            document.getElementById("btn-quiz-next").addEventListener("click", () => {
                // Navigate back to path curriculum to see progress checkmark
                window.location.hash = `#path?id=${pathId}`;
            });
        }
    }

    render();
}
