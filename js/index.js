// main //
document.addEventListener('DOMContentLoaded', () => {

    // create form
    const form = document.querySelector('#github-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        // clear page before sending form
        const userList = document.querySelector('#user-list');
        userList.textContent = "";
        userSearch(event.target.search.value);
        form.reset();
    });

});


// functions //
// get user data via user search endpoint
function userSearch(userName) {
    fetch(`https://api.github.com/search/users?q=${userName}`)
        .then(response => response.json())
        .then(data => createUser(data))
}

// get data via user repos endpoint
function repoSearch(userName) {
    fetch(`https://api.github.com/users/${userName}/repos`)
        .then(response => response.json())
        .then(data => displayRepos(data, userName))
}


// create DOM object from data returned by fetch()
function createUser(searchData) {
    const userList = document.querySelector('#user-list');
    searchData.items.forEach((item) => {
        const li = document.createElement('li');
            // sublist
            // destructuring assignment to get multiple values
            const {login, avatar_url, html_url} = item;
            // create elements
            const userLogin = document.createElement('p');
                userLogin.textContent = login;
                userLogin.addEventListener('click', (e) => repoSearch(login));
            const userAvatar = document.createElement('img');
                userAvatar.src = avatar_url;
                userAvatar.id = 'avatar';
            const lineBreak = document.createElement('br');
            const userLink = document.createElement('a');
                userLink.href = html_url
                userLink.target = '_blank';
                userLink.textContent = 'Link to profile';
        // append to list item
        li.append(userLogin, userAvatar, lineBreak, userLink);
        // append to main list in DOM
        userList.appendChild(li);
    });
}


function displayRepos(repos, userName) {

    // create repo list elements from data returned by fetch()
    const reposList = document.querySelector('#repos-list');
    const title = document.createElement('h3');
    title.textContent = `${userName}'s repos:`;
    reposList.appendChild(title);
    repos.forEach(repo => {
        const userRepo = document.createElement('li');
        userRepo.textContent = repo.id;
        reposList.appendChild(userRepo);
    });

    // limit repo list display time
    setTimeout(function () {
        const userList = document.querySelector('#repos-list');
        userList.textContent = "";
    }, 3000);
}

