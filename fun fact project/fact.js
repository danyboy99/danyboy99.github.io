const button= document.getElementById('button');
const factDiv= document.getElementById('factDiv');
const factApi="https://uselessfacts.jsph.pl/random.json?language=en";
const spinner = document.querySelector(".spinner")

function factdata(){
        spinner.classList.remove("show");
    fetch(factApi) 
        .then((response) => response.json()) 
        .then((data) => 
        (factDiv.innerHTML= `<h3>${data.text}</h3>` ));
        spinner.classList.add("show");
}

button.addEventListener('click',factdata);