
resultDiv = document.querySelector(".result");
inputs = document.querySelectorAll(".inputs");

function calc() {
    arrOfResults = [];
    inputs.forEach( input => {
        arrOfResults.push(+input.value);
    })
    max= Math.max(...arrOfResults);
    min = Math.min(...arrOfResults);
    sum= arrOfResults.reduce((result, number) => {
        return result + number;
      }, 0);
    av = sum / 4;
    resultDiv.innerHTML = `Max: ${max} Min:${min} Sum:${sum} Av:${av} `
}
function addInput() {

}

document.addEventListener("click", calc);