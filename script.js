//creates and styles elements
var h1El = document.createElement('h1');
var pEl = document.createElement('p');
var beginBtnEl = document.createElement('button');

h1El.setAttribute('class', 'h1; text-center');
pEl.setAttribute('class', 'text-center');
beginBtnEl.setAttribute('class', 'btn; btn-success');
beginBtnEl.setAttribute('type', 'button');

h1El.textContent = 'Welcome to Quiz.JS!';
pEl.textContent = 'Click the button below to get started.';
beginBtnEl.textContent = 'Begin';

//variables that allow bootstrap columns to be called
var colOne = document.querySelector('#col-one');
var colTwo = document.querySelector('#col-two');
var colThree = document.querySelector('#col-three');
var colFour = document.querySelector('#col-four');

//adds start "page" on page load
colOne.appendChild(h1El);
colTwo.appendChild(pEl);
colThree.appendChild(beginBtnEl);

//object containing questions, answers and correct answers
var questions = [
    {
        q: 'How do you create a variable?',
        a: [
            'var = varName varValue',
            'varName varValue = var',
            'var varValue = varName',
            'var varName = varValue'
        ],
        c: 'var varName = varValue'
    },
    {
        q: 'Select the correct instance of a for loop.',
        a: [
            'for (var i = 0; i < 10; i++)',
            'for [var i = 0; i < 10; i++]',
            'for {var i = 0; i < 10; i++}',
            'for <var i = 0; i < 10; i++>'
        ],
        c: 'for (var i = 0; i < 10; i++)'
    },
    {
        q: 'What characters are an array surrounded in?',
        a: [
            'curly brackets {}',
            'parentheses ()',
            'square brackets []',
            'none of the above'
        ],
        c: 'square brackets []'
    },
    {
        q: 'Select the preferred style for naming variables in JavaScript.',
        a: [
            'my-variable',
            'my_variable',
            'myVariable',
            'Myvariable'
        ],
        c: 'myVariable'
    }
];

//adds begin button functionality
beginBtnEl.addEventListener('click', function () {
    //removes start "page"
    colOne.removeChild(h1El);
    colTwo.removeChild(pEl);
    colThree.removeChild(beginBtnEl);
    initQuestions();
});

//initializes questions
function initQuestions() {
    //creates necessary elements
    var h2El = document.createElement('h2');
    var answerOneBtnEl = document.createElement('button');
    var answerTwoBtnEl = document.createElement('button');
    var answerThreeBtnEl = document.createElement('button');
    var answerFourBtnEl = document.createElement('button');
    var pointsCounter = document.createElement('p');
    var timerEl = document.createElement('p');
    //sets classes for necessary elements
    timerEl.setAttribute('class', 'text-center');
    timerEl.setAttribute('class', 'text-center');
    beginBtnEl.setAttribute('class', 'btn; btn-success');
    beginBtnEl.setAttribute('type', 'button');
    h2El.setAttribute('class', 'h2, text-center');
    answerOneBtnEl.setAttribute('class', 'btn btn-info mx-1');
    answerOneBtnEl.setAttribute('type', 'button');
    answerTwoBtnEl.setAttribute('class', 'btn btn-info mx-1');
    answerTwoBtnEl.setAttribute('type', 'button');
    answerThreeBtnEl.setAttribute('class', 'btn btn-info mx-1');
    answerThreeBtnEl.setAttribute('type', 'button');
    answerFourBtnEl.setAttribute('class', 'btn btn-info mx-1');
    answerFourBtnEl.setAttribute('type', 'button');
    pointsCounter.setAttribute('class', 'text-center');
    //seconds for quiz
    var timeLeft = 30;
    //interval that allows us to move to next question
    var i = 0;
    nextQuestion();
    //adds points counter
    var points = 0;
    colFour.appendChild(pointsCounter);
    pointsCounter.textContent = 'Score: ' + points;

    //creates timer and start and stop functionality
    function timer() {
        timerEl.textContent = 'Time: ' + timeLeft;
        colFour.appendChild(timerEl);

        if (timeLeft === 0) {
            i++;
            nextQuestion();
        } else { timeLeft-- }
    };
    var t;
    function startTimer() {
        t = setInterval(timer, 1000)
    };
    function stopTimer() {
        clearInterval(t);
    }
    startTimer();
    function nextQuestion() {
        if (typeof questions[i] == 'undefined') {
            endScreen();
        } else {
            //resets button design
            answerOneBtnEl.setAttribute('class', 'btn btn-info mx-1');
            answerTwoBtnEl.setAttribute('class', 'btn btn-info mx-1');
            answerThreeBtnEl.setAttribute('class', 'btn btn-info mx-1');
            answerFourBtnEl.setAttribute('class', 'btn btn-info mx-1');
            //rebuilds question screen
            h2El.textContent = questions[i].q;
            colOne.appendChild(h2El);
            answerOneBtnEl.value = questions[i].a[0];
            answerOneBtnEl.textContent = questions[i].a[0];
            colTwo.appendChild(answerOneBtnEl);
            answerTwoBtnEl.value = questions[i].a[1];
            answerTwoBtnEl.textContent = questions[i].a[1];
            colTwo.appendChild(answerTwoBtnEl);
            answerThreeBtnEl.value = questions[i].a[2];
            answerThreeBtnEl.textContent = questions[i].a[2];
            colThree.appendChild(answerThreeBtnEl);
            answerFourBtnEl.value = questions[i].a[3];
            answerFourBtnEl.textContent = questions[i].a[3];
            colThree.appendChild(answerFourBtnEl);
            checkAnswer();
        };
    };

    function checkAnswer() {
        document.body.addEventListener('click', function check(event) {
            var element = event.target;
            if (element.matches('button') === true && element.textContent !== 'Begin') {
                var userAnswer = element.textContent;
                if (userAnswer === questions[i].c) {
                    element.setAttribute('class', 'btn btn-success mx-1');
                    points++;
                    pointsCounter.textContent = 'Score: ' + points;
                    i++;
                    this.removeEventListener('click', check);
                    setTimeout(nextQuestion, 500);
                } else if (userAnswer !== questions[i].c) {
                    element.setAttribute('class', 'btn btn-danger mx-1');
                    if (timeLeft > 5) {
                        timeLeft = timeLeft - 5;
                        this.removeEventListener('click', check);
                        i++;
                        setTimeout(nextQuestion, 500);
                    } else { endScreen }
                };
            };
        });
    };

    function endScreen() {
        stopTimer()
        h2El.textContent = 'Good Job!';
        colTwo.removeChild(answerOneBtnEl);
        colTwo.removeChild(answerTwoBtnEl);
        colThree.removeChild(answerThreeBtnEl);
        colThree.removeChild(answerFourBtnEl);
        colFour.removeChild(timerEl);
        colFour.removeChild(pointsCounter);
        colThree.appendChild(pointsCounter);
        //creates high score form
        var initialsForm = document.createElement('form');
        colTwo.appendChild(initialsForm);
        var initialsLabel = document.createElement('label');
        initialsLabel.setAttribute('for', 'player-initials');
        initialsLabel.textContent = 'Save your initials for the scoreboard!';
        initialsForm.appendChild(initialsLabel);
        var initialsInput = document.createElement('input');
        initialsInput.setAttribute('id', 'player-initials');
        initialsInput.setAttribute('placeholder', 'AAA');
        initialsInput.setAttribute('type', 'text');
        initialsInput.setAttribute('class', 'ml-3');
        initialsForm.appendChild(initialsInput);
        //creates store scoring functionality
        var scores = [];
        var initials = [];
        var storedScores = JSON.parse(localStorage.getItem('scores'));
        var storedInitials = JSON.parse(localStorage.getItem('initials'));
        console.log(storedScores);
        console.log(storedInitials);

        if (storedScores !== null) {
            scores = storedScores;
        }
        if (storedInitials !== null) {
            initials = storedInitials;
        }

        var table = document.createElement('table');
        table.setAttribute('class', 'table');
        colFour.appendChild(table);
        var tHead = document.createElement('thead');
        table.appendChild(tHead);
        var tHeadRow = document.createElement('tr');
        tHead.appendChild(tHeadRow);
        var initialsHeading = document.createElement('th');
        initialsHeading.setAttribute('scope', 'col');
        initialsHeading.innerHTML = 'Initials';
        tHead.appendChild(initialsHeading);
        var scoresHeading = document.createElement('th');
        scoresHeading.setAttribute('scope', 'col');
        scoresHeading.innerHTML = 'Scores';
        tHead.appendChild(scoresHeading);
        var tBody = document.createElement('tbody');
        table.appendChild(tBody);
        //loop score and initials array to create table
        for (var x = 0; x < scores.length; x++) {
            var tRow = document.createElement('tr');
            tBody.appendChild(tRow);
            var tdi = document.createElement('td');
            tdi.innerHTML = initials[x];
            tRow.appendChild(tdi);
            var tds = document.createElement('td');
            tds.innerHTML = scores[x];
            tRow.appendChild(tds);
        }


        initialsInput.addEventListener('keypress', function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                var initialsText = initialsInput.value.trim();

                if (initialsText === '') {
                    return;
                }
                initials.push(initialsText);
                initialsInput.value = '';
                scores.push(points);
                localStorage.setItem('scores', JSON.stringify(scores));
                localStorage.setItem('initials', JSON.stringify(initials));
                console.log(scores);
                console.log(initials);
                location.reload();
            }
        });
    };
}