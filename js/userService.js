function users() {
    document.getElementById('cardHeader').innerHTML = '<h5> Listado de usuarios </h5>'
    const PLATZI_ENDPOINT = 'https://api.escuelajs.co/api/v1/users/'
    fetch(PLATZI_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((response) => {
            return response.json().then(
                data => {
                    return {
                        status: response.status,
                        info: data
                    }
                }
            )
        })
        .then((result) => {
            console.log('resultado', result)
            if (result.status === 200) {
                let listUsers = `
            <button type="button" class="btn btn-outline-success" onclick="createUser()">Crear</button>                
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Acción</th>                    
                    </tr>
                </thead>
            <tbody>
            `;
                result.info.forEach(element => {
                    listUsers = listUsers + `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.role}</td>
                    
                    <td><button type="button" class="btn btn-outline-info" onclick="getUser('${element.id}')">Ver</button></td>
                </tr>
                `
                });

                document.getElementById('info').innerHTML = listUsers
            }
            else {
                document.getElementById('info').innerHTML = 'No existen usuarios en la BD'
            }
        })
}

function getUser(idUser) {
    const PLATZI_ENDPOINT = 'https://api.escuelajs.co/api/v1/users/' + idUser
    fetch(PLATZI_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((result) => {
            return result.json().then(
                data => {
                    return {
                        status: result.status,
                        body: data

                    }
                }
            )
        })

        .then((response) => {
            if (response.status === 200) {
                const user = response.body
                const modalUser = `
                    <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Ver usuario</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="card">
                                    <img src="${user.avatar}" class="card-img-top" alt="Avatar del usuario">
                                    <div class="card-body">
                                        <h5 class="card-title">Informacion del usuario</h5>
                                        <p class="card-text"> Nombre: ${user.name} </p>
                                        <p class="card-text"> Rol: ${user.role} </p>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                    </div>
                `
                document.getElementById('viewModal').innerHTML = modalUser
                const modal = new bootstrap.Modal(
                    document.getElementById('modalUser')
                )
                modal.show()
            }
            else {
                document.getElementById('info').innerHTML = '<h3> No se encontro el usuario en la api</h3>'
            }
        })
}

function createUser() {

    const modalUser = `
                    <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Crear Usuario</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="card">
                                    <div class="card-body">
                                    
                                    <form id="formCreateUser">

                                    <div class="row">
                                        <div class="col">
                                            <input type="text" class="form-control" id="name" placeholder="name" aria-label="name" required>
                                        </div>
                                        <div class="col">
                                            <input type="text" class="form-control" id="avatar" placeholder="avatar" aria-label="avatar" required>
                                        </div>
                                    
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <input type="email" class="form-control" id="email" placeholder="email" aria-label="email" required>
                                        </div>
                                        <div class="col">
                                            <input type="password" class="form-control" id="password" placeholder="password" aria-label="password" required>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col">
                                            <button type="button" class="btn btn-success" onclick="saveUser()">Guardar</button>
                                        </div>
                                    </div>
                                    </form>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                    </div>
                `
    document.getElementById('viewModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(
        document.getElementById('modalUser')
    )
    modal.show()

}

function saveUser() {
    const form = document.getElementById('formCreateUser')
    if (form.checkValidity()) {
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const avatar = document.getElementById('avatar').value
        const user = {name , email, password, avatar}

        const PLATZI_ENDPOINT = 'https://api.escuelajs.co/api/v1/users/'
        
        fetch (PLATZI_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then((result) => {
                return result.json().then(
                    data => {
                        return {
                            status: result.status,
                            body: data

                        }
                    }
                )
            })
                .then((response) => {
                if (response.status === 201) {
                    document.getElementById('info').innerHTML = '<h3>Se guardó el usuario</h3>'
                }
                else {
                    document.getElementById('info').innerHTML = '<h3>Error al guardar el usuario</h3>'
                }
                const modalId = document.getElementById('modalUser')
                const modal = bootstrap.Modal.getInstance(modalId)
                modal.hide()
            })

    }
    else {
        form.reportValidity()
    }

}