
resultDiv = document.querySelector(".result");
inputsDiv = document.querySelector(".inputsDiv");
resultButton = document.querySelector("#submit")

function calc() {
    inputs = document.querySelectorAll(".inputs");
    arrOfResults = [];
    inputs.forEach( input => {
        arrOfResults.push(+input.value);
    })
    max= Math.max(...arrOfResults);
    min = Math.min(...arrOfResults);
    sum= arrOfResults.reduce((result, number) => {
        return result + number;
      });
    av = sum/inputs.length;
    resultDiv.innerHTML = `Max: ${max} Min:${min} Sum:${sum} Av:${av} `
}
function addInput() {
   input = document.createElement("input");
   input.setAttribute("type", "text");
   input.className = "inputs";
   inputsDiv.insertBefore(input,resultButton);
}

document.addEventListener("keyup", calc);