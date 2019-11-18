const btn = document.querySelector('.btn-get-posts');
const btnAddPost = document.querySelector('.btn-add-posts');
const container = document.querySelector('.container');

function createPosts(body, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");
    xhr.addEventListener('load', () =>{
        const response = JSON.parse(xhr.responseText);
        cb(response);
    });
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")
    xhr.addEventListener('error', () => {
        console.log('error');
    });

    xhr.send(JSON.stringify(body));
}

function getPosts(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
    xhr.addEventListener('load', () =>{
        const response = JSON.parse(xhr.responseText);
        cb(response);
    });

    xhr.addEventListener('error', () => {
        console.log('error');
    });

    xhr.send();
}

function cardTemplate(post){
    const card = document.createElement('div');
    card.classList.add('card');
    const cardBody = document.createElement('div');
    cardBody.classList.add("card-body");
    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = post.title;
    const article = document.createElement('p');
    article.classList.add('cart-text');
    article.textContent = post.body;
    cardBody.appendChild(title);
    cardBody.appendChild(article);
    card.appendChild(cardBody);
    return card;
}

function renderPost(response){
    const fragment = document.createDocumentFragment();
        response.forEach(post => {
            const card = document.createElement('div');
            card.classList.add('card');
            const cardBody = document.createElement('div');
            cardBody.classList.add("card-body");
            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = post.title;
            const article = document.createElement('p');
            article.classList.add('cart-text');
            article.textContent = post.body;
            cardBody.appendChild(title);
            cardBody.appendChild(article);
            card.appendChild(cardBody);
            fragment.appendChild(card);
        });
        container.appendChild(fragment);
}

btn.addEventListener("click", (e) => {
    getPosts(response => {
            renderPost(response);
        });
});

btnAddPost.addEventListener("click", (e) => {
    const newPost = {
        title: 'foo',
        body: 'bar',
        userId: 1
      };
      createPosts(newPost, response => {
          console.log(response)
          const card = cardTemplate(response);
          container.insertAdjacentElement("afterbegin", card);
          console.log(card);
      } )
});




