$(document).ready(function() {
    // Object with all questions and question data.
    var questions = [{
        id: 0,
        text: 'Trumpery',
        answers: ['Luggage designed for carrying an instrument', 'Worthless nonsense', 'The act of being more important than someone else', 'A place where trumpets are serviced'],
        alt: 'boop doop',
        correctAnswerIndex: 1
    }, {
        id: 1,
        text: 'Borborygmus',
        answers: ['A mythical horned sea creature', 'A rumbling sound in the intenstines', 'A lump on the skin', 'A scarring of the bronchial tubes'],
        alt: 'bloop',
        correctAnswerIndex: 1
    }, {
        id: 2,
        text: 'Mumpsimus',
        answers: ['One who steals things that are not very valuable', 'A notion that is held even though it\'s unreasonable', 'Talk that is not meaningful or important', 'An organ donor'],
        alt: 'boop doop',
        correctAnswerIndex: 1
    }, {
        id: 3,
        text: 'Crapulence',
        answers: ['Sickness caused by excessive eating or drinking', 'A rupturing of the intenstines', 'Ownership of excessive amounts of jewels', 'A gambling addiction'],
        alt: 'boop doop',
        correctAnswerIndex: 0
    }, {
        id: 4,
        text: 'Slubber',
        answers: ['To fumble with one\'s words', 'To lose confidence', 'To lose focus', 'To perform carelessly'],
        alt: 'boop doop',
        correctAnswerIndex: 3
    }, {
        id: 5,
        text: 'Folderol',
        answers: ['A kitchen tool used to crush garlic', 'Excessive confidence', 'Foolish words or ideas', 'A machine used to treat stomach cramps'],
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 6,
        text: 'Yclept',
        answers: ['An archaic name for a bartender', 'To confuse one person for another', 'A heinous crime', 'To call or be named'],
        alt: 'boop doop',
        correctAnswerIndex: 3
    }, {
        id: 7,
        text: 'Usufruct',
        answers: ['The right to use or enjoy something', 'An area where trains park', 'A citrus fruit used in cold climates', 'The act of breaching a contract'],
        alt: 'boop doop',
        correctAnswerIndex: 0
    }, {
        id: 8,
        text: 'Quodlibet',
        answers: ['A piece of music containing several different melodies', 'A flat outdoor area for recreational activities', 'A geometric shape', 'The act of going to a far extent'],
        alt: 'boop doop',
        correctAnswerIndex: 0
    }, {
        id: 9,
        text: 'Gardyloo',
        answers: ['A collection of tulips', 'A guest outhouse', 'An herb that grows in tropical climates', 'A warning cry'],
        alt: 'boop doop',
        correctAnswerIndex: 3
    }];

    // Global variable with current question content.
    var currentQuestion = {};

    // Global variable with current scores.
    var answersCorrect = 0;
    var answersIncorrect = 0;
    var answersTimedOut = 0;


    // Game logic object.
    var game = {
        // Variables
        questionsUnasked: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],

        // Methods
        selectQuestion: function() {
            // Verify that there are questions left to answer.
            if (game.questionsUnasked.length === 0) {
                DOMFunctions.callDOMFunctions('gameComplete');
            } else {
                // Randomly select one of the unasked questions.
                var questionIndex = Math.floor(Math.random() * game.questionsUnasked.length);
                // Get its ID in questions.
                var id = game.questionsUnasked[questionIndex];
                // Set the global currentQuestion object to this question.
                var lookup = {};
                for (var i = 0; i < questions.length; i++) {
                    lookup[questions[i].id] = questions[i];
                }
                currentQuestion = lookup[id];
                // Remove the question's ID from the unasked questions.
                game.questionsUnasked.splice(questionIndex, 1);
                DOMFunctions.callDOMFunctions(event = 'newQuestion');
                timer.start();
            }
        },

        isCorrect: function(answerIndex) {
            // Check whether the answer given is the correct answer.
            if (answerIndex === currentQuestion.correctAnswerIndex) {
                return true;
            } else {
                return false;
            }
        },

        updateScores: function(correct) {
            // Increment appropriate score counter variable.
            if (correct === true) {
                answersCorrect++;
            } else if (correct === false) {
                answersIncorrect++;
            } else {
                answersTimedOut++;
            }
        },

        resetGame: function() {
            game.questionsUnasked = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            game.answersCorrect = 0;
            game.answersIncorrect = 0;
            game.answersTimedOut = 0;
        }
    };

    // Timeout and interval object
    var timer = {
        count: 31,
        start: function() {
            timer.decrement();
            counter = setInterval(timer.decrement, 1000);
        },
        decrement: function() {
            timer.count--;
            DOMFunctions.displayTimer(timeRemaining = timer.count);
            if (timer.count === 0) {
                timer.stop();
                DOMFunctions.callDOMFunctions(event = 'questionAnswered', correct = '');
                game.updateScores();
            }
        },
        stop: function() {
            clearInterval(counter);
            timer.count = 31;
        },
    };


    // DOM writing object
    var DOMFunctions = {
        displayTimer: function(timeRemaining) {
            $('#timer').text(timeRemaining);
        },
        displayQuestion: function() {
            $('#question').text(currentQuestion.text);
            $('.answer-options').empty();
            for (var i=0;i<currentQuestion.answers.length;i++) {
                option = $('<h3>');
                option.text(currentQuestion.answers[i]);
                option.attr('data-index', i);
                option.addClass('text-center option');
                option.attr('role','button');
                $('.answer-options').append(option);
            }
        },
        displayAnswer: function(correct) {
            $('.question-display').hide();
            $('.timer').hide();
            $('.question-result').show();
            $('#correct-answer').text('Definition: ' + currentQuestion.answers[currentQuestion.correctAnswerIndex]);
            $('#question-image').attr('src', 'assets/images/' + currentQuestion.text + '.png');
            $('#question-image').attr('alt', currentQuestion.alt);
            if (correct === true) {
                $('#question-win-loss').text('Correct!');
            } else if (correct === false) {
                $('#question-win-loss').text('Incorrect...');
            } else {
                $('#question-win-loss').text('Time\'s Up!');
            }
            setTimeout(displayNextQuestion, 3000);
        },
        hideAnswer: function() {
            $('.question-display').show();
            $('.timer').show();
            $('.question-result').hide();
        },
        displayResults: function() {
            $('.question-display').hide();
            $('.game-results').show();
            $('#questions-correct').text('Correct: ' + answersCorrect);
            $('#questions-incorrect').text('Incorrect: ' + answersIncorrect);
            $('#questions-unanswered').text('Unanswered: ' + answersTimedOut);
            $('.restart').show();
        },
        displayNewGame: function() {
            $('.restart').hide();
            $('.game-results').hide();
            $('#start-button').show();
        },
        callDOMFunctions: function(event, correct) {
            if (event === 'startGame') {
                $('.start').hide();
            } else if (event === 'newQuestion') {
                DOMFunctions.displayQuestion();
                DOMFunctions.hideAnswer();
            } else if (event === 'questionAnswered') {
                DOMFunctions.displayAnswer(correct);
            } else if (event === 'gameComplete') {
                DOMFunctions.hideAnswer();
                DOMFunctions.displayResults();
            } else if (event === 'restartClicked') {
                DOMFunctions.displayNewGame();
            }
        }
    };


    // On-click events
    // When the start button is clicked.
    $('#start-button').on('click', function() {
        DOMFunctions.callDOMFunctions(event = 'startGame');
        displayNextQuestion();
    });

    // When an answer is clicked.
    $(document).on('click', '.option', function() {
        var answerIndex = $(this).data('index');
        answerIndex = parseInt(answerIndex, 10);
        var answerCorrectness = game.isCorrect(answerIndex);
        timer.stop();
        DOMFunctions.callDOMFunctions(event = 'questionAnswered', correct = answerCorrectness);
        game.updateScores(answerCorrectness);
    });

    // When the start over button is clicked.
    $('#restart-button').on('click', function() {
        game.resetGame();
        call.DOMFunctions.DOMFunctions(event = 'restartClicked');
    });

    var displayNextQuestion = function() {
        game.selectQuestion();
    };


});
