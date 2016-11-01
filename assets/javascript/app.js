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
    }, {
        id: 2,
        question: 'What is a good trivia question?',
        answers: ['who knows', 'who cares', 'idek', 'phuck'],
        src: 'q1.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 3,
        question: 'What is a good trivia question?3',
        answers: ['who knows', 'who cares', 'idek', 'phuck'],
        src: 'q3.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 4,
        question: 'What is a good trivia question?4',
        answers: ['who knows', 'who cares', 'idek', 'phuck'],
        src: 'q4.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 5,
        question: 'What is a good trivia question?5',
        answers: ['who knows', 'who cares', 'idek', 'phuck'],
        src: 'q5.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 6,
        question: 'What is a good trivia question?6',
        answers: ['who knows', 'who cares', 'idek', 'phuck'],
        src: 'q6.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 7,
        question: 'What is a good trivia question?7',
        answers: ['who knows', 'who cares', 'idek', 'phuck'],
        src: 'q7.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 8,
        question: 'What is a good trivia question?8',
        answers: ['who knows', 'who cares', 'idek', 'phuck'],
        src: 'q8.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 9,
        question: 'What is a good trivia question?9',
        answers: ['who knows', 'who cares', 'idek', 'phuck'],
        src: 'q9.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
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
            var questionIndex = Math.floor(Math.random() * game.questionsUnasked.length);
            console.log(questionIndex);
            // Get its ID in questions.
            var id = game.questionsUnasked[questionIndex];
            console.log(id);
            // Set the currentQuestion object to this question.
            var lookup = {};
            for (var i = 0; i < questions.length; i++) {
                lookup[questions[i].id] = questions[i];
            }
            var theID = lookup[id];
            // Remove the question's ID from the unasked questions.
            game.questionsUnasked.splice(questionIndex, 1);
            return theID;
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

    var count = -1;

    // Timeout and interval object
    var timer = {
        start: function() {
            counter = setInterval(timer.countDown, 1000);
        },
        stop: function() {
            clearInterval(counter);
            count = -1;
        },
        countDown: function() {
            count++;
            DOMFunctions.displayTimer(count);
            if (count == 30) {
                timer.stop();
            }
        },
    };


    // DOM writing object
    var DOMFunctions = {
        displayTimer: function(time) {
            $('#timer').text(30 - time);
        },
        displayQuestion: function(question) {
            console.log(question.question);
        },
        displayAnswer: function() {

        },
        displayResults: function() {

        },
        displayNewGame: function() {

        },
        callDOMFunctions: function(event,question) {
            if (event === 'start') {
                DOMFunctions.displayQuestion(question);
            } else if (event === 'questionAnswered') {

            }
        }


    };




    // Function Calls
    // Unclear whether I need anything here since it starts with the static start page.

    // On-click events
    $('#start-button').on('click', function() {
        var firstQuestion = game.selectQuestion();
        DOMFunctions.callDOMFunctions(event = 'start',question = firstQuestion);
        timer.start();
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
