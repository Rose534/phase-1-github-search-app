document.addEventListener('DOMContentLoaded', ()=>{
    fetchData()
})


function fetchRepo(element){
    fetch(`https://api.github.com/users/${element.login}/repos`)
    .then(response => response.json())
    .then(data => {
        const repos = document.querySelector('#repos-list')
        data.forEach(element => {
            const li = document.createElement('li')
            li.innerText = element.full_name
            repos.appendChild(li)
        })
    })
}
function fetchData(){
    fetch('https://api.github.com/search/users?q=octocat', {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json" 
        }
    })
    .then(response => response.json())
    .then(data => {
        const p = document.querySelector('#github-form')
        p.addEventListener('submit', (event) => {
            event.preventDefault()
            let user = document.getElementById('search').value
            data.items.forEach( element => {
                if(user === element.login){
                    const userList = document.getElementById('user-list')
                    userList.insertAdjacentHTML('beforeend', 
                    `<img src="${element.avatar_url}" class="avatar_image">
                    <h3><a href='javascript:;' id="link");'>${element.login}</a></h3>
                    <p>Page URL: ${element.html_url}</p>`)
                    document.querySelector('#link').addEventListener('click', () => {
                        fetchRepo(element)
                    })
                }
                
            }) 
            p.reset()
            });  
        })
    }






