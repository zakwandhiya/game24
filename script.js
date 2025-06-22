let score = 0;
let numbersOnDeck = [];

document.getElementById('userInput').addEventListener('input', function(e) {
    let inputValue = e.target.value;
    let numbers = extractNumbers(inputValue);
    let highlightIndex=[false,false,false,false]
    for (let i = 0; i < numbers.length; i++) {
        for (let k = 0; k < 4; k++) {
            if(numbers[i] == numbersOnDeck[k]){
                highlightIndex[k] = true;
            }
        }
    }

    for (let i = 0; i < 4; i++) {
        if(highlightIndex[i]){
            document.getElementById(`card${i+1}`).classList.add('selected');
        }else{
            document.getElementById(`card${i+1}`).classList.remove('selected');
        }
    }
    
});

function search(ele) {
    if(event.key === 'Enter') {
        evaluateExpression();       
    }
}


function evaluateExpression() {
    const userInput = document.getElementById('userInput').value;
    let numbers = extractNumbers(userInput);
    console.log(numbers);
    let correctNumberCount = 0;
    if(numbers.length != 4){
        console.log("semua angka yang diberikan harus digunakan satu dan hanya satu kali")
        score -= 50;
        document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
        document.getElementById('errorDisplay').innerText = `semua angka yang diberikan harus \ndigunakan satu dan hanya satu kali`;
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
        document.getElementById('errorDisplay').innerText = `semua angka yang diberikan harus \ndigunakan satu dan hanya satu kali`;
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
            for (let i = 0; i < 4; i++) {
                document.getElementById(`card${i+1}`).classList.remove('selected');
            }
            document.getElementById('userInput').value = '';
            refreshNumber();
        } else {
            console.log(`hasil dari persamaan tersebut adalah ${result}`)
            score -= 50;
            document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
            document.getElementById('errorDisplay').innerText = `hasil dari persamaan tersebut \nadalah ${result}`;
        }
    } catch (e) {
        alert('Invalid expression. Please try again.');
        document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
    }
}

function skipThisDeck() {
    score -= 200;
    document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
    document.getElementById('errorDisplay').innerText = ``;
    document.getElementById('userInput').value = '';
    for (let i = 0; i < 4; i++) {
        document.getElementById(`card${i+1}`).classList.remove('selected');
    }
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