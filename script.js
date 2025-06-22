// const cards = document.querySelectorAll('.card');

// let selectedCardIndex = -1;

// cards.forEach((card, index) => {
//     card.addEventListener('click', () => {
//         if (selectedCardIndex !== -1) {
//             cards.forEach(c => c.classList.remove('selected'));
//         }
//         selectedCardIndex = index;
//         card.classList.add('selected');
//     });
// });

let score = 0;
let numbersOnDeck = [];

function evaluateExpression() {
    const userInput = document.getElementById('userInput').value;
    let numbers = extractNumbers(userInput);
    console.log(numbers);
    let correctNumberCount = 0;
    if(numbers.length != 4){
        console.log("semua angka yang diberikan harus digunakan satu dan hanya satu kali")
        score -= 50;
        document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
        document.getElementById('errorDisplay').innerText = `semua angka yang diberikan harus digunakan satu dan hanya satu kali`;
        return;
    }
    for (let i = 0; i < 4; i++) {
        for (let k = 0; k < 4; k++) {
            if(numbers[i] == numbersOnDeck[k])   {
                correctNumberCount ++;
            }
        }
    }
    if(correctNumberCount != 4){
        console.log("semua angka yang diberikan harus digunakan satu dan hanya satu kali")
        score -= 50;
        document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
        document.getElementById('errorDisplay').innerText = `semua angka yang diberikan harus digunakan satu dan hanya satu kali`;
        return;
    }
    calculate(userInput);
}

function extractNumbers(expression) {
    // Regular expression to match numbers in the expression
    const numberRegex = /\d+/g;

    // Find all matches of numbers in the expression
    const numbers = expression.match(numberRegex);

    // If there are matches, return them as an array, else return an empty array
    return numbers ? numbers.map(Number) : [];
}

function calculate(userInput) {
    try {
        const result = eval(userInput);
        if (result === 24) {
            score += 100;
            document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
            
            document.getElementById('errorDisplay').innerText = ``;
            refreshNumber();
        } else {
            console.log(`hasil dari persamaan tersebut adalah ${result}`)
            score -= 50;
            document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
            document.getElementById('errorDisplay').innerText = `hasil dari persamaan tersebut adalah ${result}`;
        }
        document.getElementById('userInput').value = '';
    } catch (e) {
        alert('Invalid expression. Please try again.');
        document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
    }
}

function skipThisDeck() {
    score -= 200;
    document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
    refreshNumber();
}

function generateUniqueRandomNumbers() {
    let numbers = [];
    while (numbers.length < 4) {
        let randomNum = Math.floor(Math.random() * 10) + 1;
        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum);
        }
    }
    return numbers;
}

function setGeneratedNumberToDeck(numbers){
    for (let i = 0; i < 4; i++) {
        document.getElementById(`card${i+1}`).innerText = numbers[i];       
    }
}

function refreshNumber(){
    numbersOnDeck =  generateUniqueRandomNumbers();
    setGeneratedNumberToDeck(numbersOnDeck);
}

refreshNumber();