document.addEventListener('DOMContentLoaded', function() {

    const links = document.querySelectorAll('.project-trigger')
    links.forEach((val, key)=>{
        val.addEventListener('mouseenter', project_preview)
    })
    links.forEach((val, key)=>{
        val.addEventListener('click', project_view)
    })
})


function project_preview(event) {
    const project = event.target.getAttribute('project')
    request_api('/preview/' + project, show_preview)
}


function project_view(event) {
    const project = event.target.getAttribute('project')
    request_api('/project/' + project, show_project)
}


function show_preview(data) {
    const container = document.getElementById('project-content')
    container.innerHTML = data
}


function show_project(data) {
    const container = document.getElementById('project-content')
    container.innerHTML = data
    const menu = document.querySelector('.background')
    menu.classList.add('fixed')
}


function request_api(url, process_function) {
    fetch(url).then((response) => {
        return response.text()
    }).then((data) => {
        process_function(data)
    })
}