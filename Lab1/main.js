let liczba1 = document.querySelector("#liczba1");
liczba2 = document.querySelector('#liczba2');
liczba3 = document.querySelector('#liczba3');
liczba4 = document.querySelector('#liczba4');
resultDiv = document.querySelector(".result");
inputs = document.querySelectorAll(".inputs");

function calc() {
    arrOfResults = [];
    inputs.forEach( input => {
        arrOfResults.push(+input.value);
    })
    max= Math.max(...arrOfResults);
    min = Math.min(...arrOfResults);
    sum= +liczba1.value + +liczba2.value + +liczba3.value + +liczba4.value;
    av = sum / 4;
    resultDiv.innerHTML = `Max: ${max} Min:${min} Sum:${sum} Av:${av} `
}
function addInput() {

}

document.addEventListener("click", calc);