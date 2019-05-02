// Code your solution here
document.addEventListener("DOMContentLoaded", function() {
    
    fetchAllShoes()
    })
 
    
function fetchAllShoes(){
    fetch('http://localhost:3000/shoes')
    .then(response => response.json())
    .then(data => data.forEach(data => addShoes(data)))
}
           
function addShoes(data){
    let uL = document.getElementById("shoe-list")
    let lI = document.createElement('li')
    lI.innerText = data.name
    lI.className = "list-group-item"
    lI.dataset.id = data.id
    lI.addEventListener('click',shoeFetch)
    uL.appendChild(lI)
    showShoe(data)


}

function shoeFetch(e){

    fetch(`http://localhost:3000/shoes/${e.target.dataset.id}`)
        .then(response => response.json())
        .then(data => showShoe(data))


}




function showShoe(data){



console.log(data)
 let div = document.getElementById("main-shoe")
 div.innerHTML = ""   
 let img = document.createElement("img")
  img.className = "card-img-top"        
  img.dataset.id = "shoe-image"
  img.src = data.image 
  div.appendChild(img) 
  let titleDiv = document.createElement("div")
  titleDiv.className = "card-body"                           //querySelector(".card-body") 
  let h = document.createElement("h4")    
  h.className = "card-title"
  h.dataset.id = "shoe-name"
  h.innerText = data.name
  let pD = document.createElement("p")  
  pD.className = "card-text"
  pD.dataset.id = "shoe-description"
  pD.innerText = data.description
  let pP = document.createElement("p")
  pP.className = "card-text"
  pP.dataset.id = "shoe-price"
  pP.innerText = `$${data.price}`
  let formDiv = document.createElement("div")
  formDiv.className = "container"
  formDiv.dataset.id = "form-container"
  let form = document.createElement("form")
  form.innerHTML=`<form id="new-review">
  <div class="form-group">
    <textarea class="form-control" id="review-content" rows="3"></textarea>
    <input type="submit" class="btn btn-primary" id='${data.id}'></input>
  </div>
</form>`

  let headerR = document.createElement("h5")
  headerR.className = "card-header"
  headerR.innerText = "Reviews"     
  let reviewUl = document.createElement("ul")
  reviewUl.className = "list-group list-group-flush"
  reviewUl.id = "reviews-list"
  data.reviews.forEach(review => {
    //console.log(review);
    let reviewLi = document.createElement("li")
    reviewLi.innerText = review.content
    reviewUl.appendChild(reviewLi)   
    })
  
  
  
  
  formDiv.appendChild(form)  
  titleDiv.appendChild(h)
 titleDiv.appendChild(pD) 
 titleDiv.appendChild(pP)
 titleDiv.appendChild(formDiv)
 div.appendChild(titleDiv)  // main div 
 div.appendChild(headerR)   // review
 div.appendChild(reviewUl)  // review 
 let submitBtn = document.getElementById(data.id)

  submitBtn.addEventListener('click',addReview)  
}

function addReview(e){
e.preventDefault()
let id = e.target.id
let review = e.target.parentElement.querySelector('#review-content').value
console.log(review, id  )

fetch(`http://localhost:3000/shoes/${id}/reviews`, {
method: "POST",
body: JSON.stringify({
content: review

}),
headers:{
'Content-Type': 'application/json'
}
})

//fetch(`http://localhost:3000/shoes/${id}`)
  //      .then(response => response.json())
    //    .then(data => showShoe(data))


       // data.reviews.forEach(review => {
            //console.log(review);
         //   debugger
                

      let reviewUl = document.getElementById("reviews-list")       
            let reviewLi = document.createElement("li")
            reviewLi.innerText = review
            reviewUl.appendChild(reviewLi)   
            let div = document.getElementById("main-shoe")      
         div.appendChild(reviewUl)
         e.target.parentElement.querySelector('#review-content').value = " "
}







//<h5 class="card-header">Reviews</h5>
          //  <ul class="list-group list-group-flush" id="reviews-list">
          //    <!-- REVIEWS GO HERE -->
          //  </ul>
          //</div>