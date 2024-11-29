const formWrapper = document.querySelector(".form-wrapper"); //burada tek tek değerlerini yakalıyorum 
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper= document.querySelector(".button-wrapper");
const searchButton = document. querySelector("#searchButton");
const clearButton = document. querySelector("#clearButton");
const imageListWrapper= document. querySelector(".imageList-wrapper");

runEventListeners();
function runEventListeners(){
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear);
}

function clear(){
    searchInput.value = search.value="";//içine girilen degeri siliyor
    // Array.from(imageListWrapper.children).forEach((child)=>child.remove())
    imageListWrapper.innerHTML=""; //kısa yolla bu sekilde de temizleyebiliriz
}

function search(e){
    const value = searchInput.value.trim();
    // @RequestParam - Spring-Rest APİ
    fetch(`https://api.unsplash.com/search/photos?query=${value}`,
        { //dinamik olarak bir değer geçiyorum
        method : "GET",
        headers : {
            Authorization : "Client-ID b9pwqUTYntouarOP6_lvcOy50UKyCIYc7kWALhRMGS4"
         }
    })//istek atmak için kullanılır
    .then((res)=>res.json())
    .then((data)=>{
        Array.from(data.results).forEach((image)=>{
         addImageToUI(image.urls.small)
        })
    })
    .catch((err)=>console.log(err));

    e.preventDefault();//submit anında sayfanın yenilenmesini engellemiş oluyoruz.
}

function addImageToUI(url){
    /*
    <div class="card">
           <img src="" alt="">
     </div>
    */
    console.log(imageListWrapper)
    const div = document.createElement("div");
    div.className="card";

    const img= document.createElement("img");
    img.setAttribute("src",url);
    img.height='400';
    img.width='400';

    div.append(img);
    imageListWrapper.append(div);
}

