document.addEventListener('DOMContentLoaded', function() {

    const links = document.querySelectorAll('.project-trigger')
    links.forEach((val, key)=>{
        val.addEventListener('mouseenter', project_preview)
    })
    links.forEach((val, key)=>{
        val.addEventListener('click', project_view)
    })

    const project_view_item = document.getElementById('project-view')
    project_view_item.addEventListener('click', (event) => {
        event.target.innerHTML = ''
        links.forEach((val, key) => {
            if (val != event.target) {
                val.classList.remove('disabled')
            }
        })
    })
})


function project_preview(event) {
    const project = event.target.getAttribute('project')
    request_api('/preview/' + project, show_preview)
}


function project_view(event) {
    const view = document.getElementById('project-preview')
    view.innerHTML = ''
    const project = event.target.getAttribute('project')
    request_api('/project/' + project, show_project)
    const links = document.querySelectorAll('.project-trigger')
    links.forEach((val, key) => {
        if (val != event.target) {
            val.classList.add('disabled')
        }
    })

}


function project_hide(event) {
    const container = document.getElementById('project-content')
    container.style.display = 'none'
}


function show_preview(data) {
    const container = document.getElementById('project-preview')
    container.innerHTML = data
}


function show_project(data) {
    const container = document.getElementById('project-view')
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