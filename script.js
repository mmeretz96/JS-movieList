let myMovies = [];
const form = document.querySelector("form")
const movieList = document.querySelector(".movies")
const newButton = document.querySelector(".addMovie")

function Movie(title, director, length, watched, image = null) {
  this.title = title;
  this.director = director;
  this.length = length;
  this.watched = watched;
  this.image = image;
}

Movie.prototype.toggleWatched = function(){
  this.watched = !this.watched
}

function addMovie(movie) {
  myMovies.push(movie)
}

function findMovie(title){
  let m
  myMovies.forEach(mov => {
    if(mov.title === title){
      m = mov
    }
  })
  return m
}

function delMovie(title){
  myMovies.forEach((mov, i) => {
    if(mov.title === title){
      myMovies.splice(i, 1)
    }
  })
}

function toggleForm(){
  form.classList.toggle("hidden")
  form.reset()
}

function showMovies() {
  movieList.innerHTML = ""

  myMovies.forEach(m => {
    const movieContainer = document.createElement('div');
    movieContainer.className = "movie"

    const img = document.createElement('img');
    img.classList.add("movImg")
    console.log(m.image)
    if(!m.image){
      img.setAttribute("src", "icons/noimage.png")
    }else{
      img.setAttribute("src", m.image)
    }

    const col = document.createElement('div');
    col.classList.add("col")

    const title = document.createElement('div');
    title.classList.add("movieTitle")
    title.innerText = m.title

    const director = document.createElement('div');
    director.classList.add("director", "movieData")
    director.innerText = "DIRECTOR: " + m.director

    const length = document.createElement('div');
    length.classList.add("length", "movieData")
    length.innerText = "LENGTH: " + m.length + " min"

    col.appendChild(title)
    col.appendChild(director)
    col.appendChild(length)
    movieContainer.appendChild(img)
    movieContainer.appendChild(col)

    const controls = document.createElement('div');
    controls.classList.add("controls")

    const watched = document.createElement('div');
    watched.classList.add("watched", "checkbox-wrapper-13");

    const label = document.createElement('label');
    label.setAttribute("for", "cb")
    label.innerText = "WATCHED"

    const cb = document.createElement('input');
    cb.setAttribute("id", "cb")
    cb.setAttribute("type", "checkbox")
    cb.setAttribute("data-title", m.title)
    if(m.watched){
      cb.setAttribute("checked","")
    }

    const del = document.createElement('img');
    del.setAttribute("src", "icons/trash.png")
    del.setAttribute("data-title", m.title)
    del.classList.add("delIcon")


    del.addEventListener("click", e=> {
      delMovie(e.target.getAttribute("data-title"))
      showMovies()
    })


    controls.appendChild(watched)
    watched.appendChild(label)
    watched.appendChild(cb)
    movieContainer.appendChild(controls)
    controls.appendChild(del)
    movieList.append(movieContainer)
  });

 const boxes = document.querySelectorAll("#cb")
  boxes.forEach(box => {
    box.addEventListener("click", e => {
      findMovie(e.target.getAttribute("data-title")).toggleWatched()
      console.log(findMovie(e.target.getAttribute("data-title")))
    })
  })

}







//EVENT LISTENERS

newButton.addEventListener("click", e =>{
  toggleForm()
})


//When user Submits the new Movie Form

form.addEventListener("submit", e => {
  e.preventDefault()
  
  console.log(form)
  const formData = new FormData(form)
  addMovie(new Movie(formData.get("title"),formData.get("director"),formData.get("length"),formData.get("watched"), URL.createObjectURL(formData.get("image"))))
  showMovies()
  toggleForm()
})

addMovie(new Movie("Hateful 8", "Quentin Tarantino", "168", true, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShyucr99_hYWiLHzr-BfNa28qtkQpO1eufEu6Yl_6N&usqp=CAE&s"))
addMovie(new Movie("Harry Potter und der Stein der Weisen", "Joanne K. Rowling", "152", false, "https://assets.cdn.moviepilot.de/files/442156878a6b9830e5b55d717f307eeed0b29f1d68a85527d107ca548c98/limit/500/1000/harry-potter-und-der-stein-der-weisen-poster.jpg"))
console.log(myMovies)
showMovies()