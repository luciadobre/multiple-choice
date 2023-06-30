function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  fetch('questions.json')
    .then(response => response.json())
    .then(data => {
      const questions = data.questions;
      shuffleArray(questions);
  
      let currentQuestionIndex = 0;
      const questionContainer = document.getElementById('question-container');
      const questionElement = document.getElementById('question');
      const optionsElement = document.getElementById('options');
      const answerElement = document.getElementById('answer');
      const nextButton = document.getElementById('next-btn');
      const remainingQuestionsCountElement = document.getElementById('remaining-questions-count');
      const correctAnswersCountElement = document.getElementById('correct-answers-count');
  
      let remainingQuestionsCount = questions.length;
      let correctAnswersCount = 0;
  
      function loadQuestion() {
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;
  
        optionsElement.innerHTML = '';
        answerElement.innerHTML = '';
  
        question.options.forEach(option => {
          const li = document.createElement('li');
          li.textContent = option;
          optionsElement.appendChild(li);
        });
  
        const showAnswerButton = document.createElement('button');
        showAnswerButton.textContent = 'Show Correct Answer';
        showAnswerButton.className = 'show-answer';
  
        showAnswerButton.addEventListener('click', () => {
          answerElement.innerHTML = "Correct Answer: " + question.answer;
  
          const userResponseContainer = document.createElement('div');
          const responseLabel = document.createElement('label');
          responseLabel.textContent = 'Did you answer correctly?';
          const yesButton = document.createElement('button');
          yesButton.textContent = 'Yes';
          const noButton = document.createElement('button');
          noButton.textContent = 'No';
  
          yesButton.addEventListener('click', () => {
            correctAnswersCount++;
            remainingQuestionsCount--;
            questions.splice(currentQuestionIndex, 1);
            nextQuestion();
          });
  
          noButton.addEventListener('click', () => {
            nextQuestion();
          });
  
          userResponseContainer.appendChild(responseLabel);
          userResponseContainer.appendChild(yesButton);
          userResponseContainer.appendChild(noButton);
          answerElement.appendChild(userResponseContainer);
        });
  
        answerElement.appendChild(showAnswerButton);
      }
  
      function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          loadQuestion();
        } else {
          questionContainer.innerHTML = '<h1>Quiz completed!</h1>';
          nextButton.style.display = 'none';
        }
        remainingQuestionsCountElement.textContent = remainingQuestionsCount;
        correctAnswersCountElement.textContent = correctAnswersCount;
      }
  
      loadQuestion();
  
      nextButton.addEventListener('click', nextQuestion);
    });
  