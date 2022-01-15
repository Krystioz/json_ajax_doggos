const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector(".breeds");
const random = document.querySelector(".btn-random");
const imgRandom = document.querySelector(".random-doggo");

fetch(BREEDS_URL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const breedsObject = data.message;
        const breedsArray = Object.keys(breedsObject);

        for (let i = 0; i < breedsArray.length; i++) {
            const option = document.createElement("option");
            option.value = breedsArray[i];
            option.innerText = breedsArray[i];
            select.appendChild(option);
        }
    });

//any time someone selects some breed the function is called and
//changes the value of API url

select.addEventListener("change", function (event) {
    //puts in the value in api of whatever breed is selected
    let url = `https://dog.ceo/api/breed/${event.target.value}/images/random`;

    getDoggo(url);
});

//insert the url into image tag source

const img = document.querySelector(".dog-img");
const spinner = document.querySelector(".spinner");
const spinner2 = document.querySelector(".spinner2")

function getDoggo(url) {
    spinner.classList.add("show");
    img.classList.remove("show");
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            img.src = data.message;
            // spinner.classList.remove("show");
            // img.classList.add("show");
        });
}
function getDoggoRandom(url) {
    spinner2.classList.add("show");
    imgRandom.classList.remove("show");
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            imgRandom.src = data.message;
        });
}

img.addEventListener("load", function () {
    spinner.classList.remove("show");
    img.classList.add("show");
});

imgRandom.addEventListener("load", function () {
    spinner2.classList.remove("show");
    imgRandom.classList.add("show");
});

random.addEventListener("click", function (url) {
    let urlRandom = `https://dog.ceo/api/breed/${select.value}/images/random`;
    getDoggoRandom(urlRandom);
});
