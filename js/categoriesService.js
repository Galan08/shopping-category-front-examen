function categories() {
    document.getElementById('cardHeader').innerHTML = '<h5> Listado de categorias </h5>'

    const PLATZI_ENDPOINT = 'https://api.escuelajs.co/api/v1/categories'
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
                let listCategories = `
            <button type="button" class="btn btn-outline-success" onclick="createCategories()">Crear</button>                
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">nombre</th>
                    <th scope="col">Slug</th>
                    <th scope="col">Imagen</th>                    
                    </tr>
                </thead>
            <tbody>
            `;
                result.info.forEach(element => {
                    listCategories = listCategories + `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.slug}</td>
                     <td><img src="${element.image}" class="img-thumbnail" alt="imagen de la categoria"></td>
                    <td><button type="button" class="btn btn-outline-info" onclick="getCategories('${element.id}')">Ver</button></td>

                </tr>
                `
                });
                listCategories = listCategories + `
                </tbody>
            </table>
            `
                document.getElementById('info').innerHTML = listCategories
            }
            else {
                document.getElementById('info').innerHTML = 'No existen categorias en la BD'
            }
        })
}

function getCategories(idCategories) {
    const PLATZI_ENDPOINT = 'https://api.escuelajs.co/api/v1/categories/' + idCategories
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
            const categories = response.body
            const modalCategories = `
                <div class="modal fade" id="modalCategories" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Ver producto</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Informacion del producto</h5>
                                    <p class="card-text"> Nombre: ${categories.name} </p>
                                    <p class="card-text"> slug: ${categories.slug} </p>
                                    <p><img src="${categories.image}" class="img-thumbnail" alt="imagen de la categoria"></p>

                                    
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
            document.getElementById('viewModal').innerHTML = modalCategories
                const modal = new bootstrap.Modal(
                    document.getElementById('modalCategories')
                )
                modal.show()
            }
            else {
                document.getElementById('info').innerHTML = '<h3> No se encontro la categoria en la api</h3>'
            }
        })
}

function createCategories() {

    const modalCategories = `
                    <div class="modal fade" id="modalCategories" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Crear Categoria</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="card">
                                    <div class="card-body">
                                    
                                    <form id="formCreateCategories">

                                    <div class="row">
                                        <div class="col">
                                            <input type="text" class="form-control" id="name" placeholder="name" aria-label="name" required>
                                        </div>
                                        
                                    
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <input type="text" class="form-control" id="image" placeholder="image" aria-label="image" required>
                                        </div>
                                        
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col">
                                            <button type="button" class="btn btn-success" onclick="saveCategories()">Guardar</button>
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
    document.getElementById('viewModal').innerHTML = modalCategories
    const modal = new bootstrap.Modal(
        document.getElementById('modalCategories')
    )
    modal.show()

}

function saveCategories() {
    const form = document.getElementById('formCreateCategories')
    if (form.checkValidity()) {
        const name = document.getElementById('name').value
        const image = document.getElementById('image').value
        const user = {name , image}

        const PLATZI_ENDPOINT = 'https://api.escuelajs.co/api/v1/categories/'
        
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
                    document.getElementById('info').innerHTML = '<h3>Se guardó la categoria</h3>'
                }
                else {
                    document.getElementById('info').innerHTML = '<h3>Error al guardar la categoria</h3>'
                }
                const modalId = document.getElementById('modalCategories')
                const modal = bootstrap.Modal.getInstance(modalId)
                modal.hide()
            })

    }
    else {
        form.reportValidity()
    }

}