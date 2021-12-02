document.addEventListener('DOMContentLoaded', (event) => {
    let books = [
        ["Fundacja","Isaac Asimov",5,['fantastyka','science fiction']],
        ["Potęga podświadomości","Joseph Murphy",4,['psychologia','rozwój osobisty']],
        ["Cel za horyzontem. Opowieść snajpera Grom-u","Karol K. Soyka, Krzysztof Kotowski",5,['biografie','historia']],
        ["Nowy wspaniały świat","Aldous Huxley",4,['fantastyka','science fiction']],
        ["Gomora. Pieniądze, władza i strach w polskim Kościele","Artur Nowak , Stanisław Obirek",3,['kryminał']],

    ]
    if(!localStorage.getItem("BookList")){
        localStorage.setItem("BookList", JSON.stringify(books));
    }
 
    booksList();

    activeRating();
    activeCategory();
    validateSubmit();
    
    
});
function booksList(){
   
    let bookList = document.querySelector('#book__list');
    let retrievedBookList = JSON.parse(localStorage.getItem("BookList"));
    

    retrievedBookList.forEach((book) => {
        let createTableRow = document.createElement('tr');
        let createTitleData = document.createElement('td');
        let createAuthorData = document.createElement('td');
        let createCategoryData = document.createElement('td');
        let createRatingData = document.createElement('td');

        createTitleData.innerText = book[0];
        createAuthorData.innerText = book[1];
      
        createCategoryData.innerText = book[3]
       

        for(let i = 0; i < book[2];i++){
            let createStar = document.createElement('i');
            createStar.classList.add('bi','bi-star')
            if(book[2] <= 2){
                createStar.classList.add('text-success')
            }
            if(book[2] == 3){
                createStar.classList.add('text-warning')
            }
            if(book[2] >= 4){
                createStar.classList.add('text-danger')
            }
            createRatingData.appendChild(createStar);
        }
    
        createTableRow.appendChild(createTitleData)
        createTableRow.appendChild(createAuthorData)
        createTableRow.appendChild(createCategoryData)
        createTableRow.appendChild(createRatingData)

        bookList.appendChild(createTableRow)
    })
}
function activeRating(){
    let inputRatings = document.querySelectorAll('.ratings__single input')
    let ratings = document.querySelectorAll('.ratings__single')
  
    inputRatings.forEach((rating,index) => {
        rating.addEventListener('change',(event)=> {
            ratings.forEach(elem => {elem.classList.remove('active')})
            event.target.checked? ratings[index].classList.add('active') : null;
        })
    })
}
function activeCategory(){
    let inputCat = document.querySelectorAll('.category__single input')
    let currentCat = document.querySelectorAll('.category__single')

    inputCat.forEach((input,index) => {
        input.addEventListener('change',(event)=> {  
            let currentActive = document.querySelectorAll('.category__single input:checked');
           
            if(currentActive.length < 4){
                event.target.checked? currentCat[index].classList.add('active') : currentCat[index].classList.remove('active');  
            }else{
                event.target.checked? event.target.checked = false : currentCat[index].classList.remove('active');  
            }

        })
    })

}
function validateSubmit(){
    let sumbitBook = document.querySelector('#add-book')
    let title = document.querySelector('#title')
    let author = document.querySelector('#author')
    let ratings = document.querySelectorAll('.ratings__single input')
    let cats = document.querySelectorAll('.category__single input')
    
    sumbitBook.addEventListener('click',(event) => {
        event.preventDefault()
        
        if(!validateTitle(title) && !validateAuthor(author) && !validateRating(ratings) && !validateCategories(cats)){
            let activeRating = document.querySelector('.ratings__single input:checked')
            let activeCategories = document.querySelectorAll('.category__single input:checked')
            let cats = []
            activeCategories.forEach((cat) => cats.push(cat.value))
            addNewBook(title.value,author.value,activeRating.value,cats)
            clearForm(title,author,ratings.cats)
            updateList();
        }
    })
    
}
function validateTitle(title) {
    let isError = true;
    
    if(title.value.length < 1){
        title.classList.add('error')
        title.classList.remove('success')
        isError = true;
    }else{
        title.classList.remove('error')
        title.classList.add('success')
        isError = false
    }


    return isError
}
function validateAuthor(author){
    let isError = true;

        if(author.value.length < 3){
            author.classList.add('error')
            author.classList.remove('success')
            isError = true;
        }else{
            author.classList.remove('error')
            author.classList.add('success')
            isError = false
        }


    
    return isError

}
function validateRating(ratings){
    
    let isRating = false;
    let ratingsFakeInputError = document.querySelectorAll('.ratings__single');

    ratings.forEach((element) => {
       element.checked ? isRating = true : null;    
    })

    if(!isRating){
        ratingsFakeInputError.forEach((element) => {
            element.classList.add('error')    
         })
         return true;
    }else{
        ratingsFakeInputError.forEach((element) => {
            element.classList.remove('error')    
         })
        return false;
    }
}
function validateCategories(categories){
    let isOneChecked = false;
    let categoriesFakeInputError = document.querySelectorAll('.category__single')
    categories.forEach((cat) =>{
        cat.checked ? isOneChecked = true : null;
    })


    if(isOneChecked){
        categoriesFakeInputError.forEach((element) => {
            element.classList.remove('error')    
         })
         return false;
    }else{
        categoriesFakeInputError.forEach((element) => {
            element.classList.add('error')    
         })
        return true;
    }
}
function addNewBook(title,author,rating,categories){
    let retrievedBookList = JSON.parse(localStorage.getItem("BookList"));
    retrievedBookList.push([title,author,Number(rating),categories])
    localStorage.setItem("BookList", JSON.stringify(retrievedBookList));
}
function updateList(){
    let bookListHTML = document.querySelector('#book__list');
    bookListHTML.innerHTML = "";
    booksList();
}
function clearForm(t,a,r,c){
    document.querySelector('#title').value = "";
    document.querySelector('#title').classList.remove('success')
    document.querySelector('#author').value = "";
    document.querySelector('#author').classList.remove('success')
    let ratings = document.querySelectorAll('.ratings__single')
    let ratingInputs = document.querySelectorAll('.ratings__single input')
    ratingInputs.forEach((input, index)=> {
        input.checked = false;
        ratings[index].classList.remove('active')
    })
    
    let catWrapper = document.querySelectorAll('.category__single')
    let catInputs = document.querySelectorAll('.category__single input')
    catInputs.forEach((input, index)=> {
        input.checked = false;
        catWrapper[index].classList.remove('active')
    })
}