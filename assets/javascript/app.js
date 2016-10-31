$(document).ready(function() {
    // Object with all questions and question data.
    var questions = [{
        id: 0,
        question: 'What is a good trivia question?',
        answers: ['who knows', 'who cares', 'idek', 'phuck'],
        src: 'q1.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 1,
        question: 'fuck what is happening',
        answers: ['1', '2', '3', '4'],
        src: 'q2.png',
        alt: 'bloop',
        correctAnswerIndex: 0
    }];

    // Variable accessible in all scopes with current question content.
    var currentQuestion = {};


    // Game logic object.
    var game = {
        // Variables
        questionsUnasked: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        answersIncorrect: 0,
        answersCorrect: 0,
        answersTimedOut: 0,

        // Methods
        selectQuestion: function() {
            // Randomly select one of the unasked questions.
            var questionIndex = Math.floor(Math.random()) * questionsUnasked.length;
            // Get its ID in questions.
            var questionID = questionsUnasked[questionIndex];
            // Set the currentQuestion object to this question.
            currentQuestion = questions.find(this.id === questionID);
            // Remove the question's ID from the unasked questions.
            game.questionsUnasked.splice(questionIndex, 1);
        },

        isCorrect: function(answerIndex) {
            // Check whether the answer given is the correct answer.
            if (answerIndex === currentQuestion.correctAnswerIndex) {
                return true;
            } else {
                return false;
            }
        },

        updateScores: function(result) {
            // Increment appropriate score counter variable.
            if (result === 'correct') {
                answersCorrect++;
            } else if (result === 'incorrect') {
                answersIncorrect++;
            } else if (result === 'unanswered') {
                answersTimedOut++;
            }
        }
    };

    // Timeout and interval object
    var timer = {
        start: function(length) {
            counter = setInterval(timer.countDown, 1000);
            var length
            timer.countDown();
        },
        stop: function() {

        },
        reset: function() {

        },
        countDown: function() {
        	

        },
    };


    // DOM writing object
    var DOMFunctions = {
        displayTimer: function() {
            console.log('timer');
        },
        displayQuestion: function() {
            console.log('question');
        },
        displayAnswer: function() {

        },
        displayResults: function() {

        },
        displayNewGame: function() {

        },
        callDOMFunctions: function(event) {
            if (event === 'start') {
                DOMFunctions.displayTimer();
                DOMFunctions.displayQuestion();
            } else if (event === 'questionAnswered') {

            }
        }


    };




    // Function Calls
    // Unclear whether I need anything here since it starts with the static start page.

    // On-click events
    $('#start-button').on('click', function() {
        console.log('start clicked');
        DOMFunctions.callDOMFunctions(event = 'start');
    });

    // When you select an answer,
    $('.answer').on('click', function() {
        console.log(this.id);
    });
    // Call game.isCorrect();
    // Call game.updateScores();
    // Call DOM writer with event 'answered'

    // When you click start over button,
    // Call game.resetGame();
    // Call DOM writer with event 'restart';

});
