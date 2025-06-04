function products() {
    document.getElementById('cardHeader').innerHTML = '<h5> Listado de productos </h5>'

    const PLATZI_ENDPOINT = 'https://api.escuelajs.co/api/v1/products'
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
                let listProducts = `
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Título</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Descripción</th>                    
                    <th scope="col">Acción</th>                                        
                    </tr>
                </thead>
            <tbody>
            `;
                result.info.forEach(element => {
                    listProducts = listProducts + `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.title}</td>
                    <td>$${element.price}</td>
                    <td>${element.description}</td>
                    <td><button type="button" class="btn btn-outline-info" onclick="getProduct('${element.id}')">Ver</button></td>
                </tr>
                `
                });
                listProducts = listProducts + `
                </tbody>
            </table>
            `
                document.getElementById('info').innerHTML = listProducts
            }
            else {
                document.getElementById('info').innerHTML = 'No existen productos en la BD'
            }
        })
}

function getProduct(idProduct) {
    const PLATZI_ENDPOINT = 'https://api.escuelajs.co/api/v1/products/' + idProduct
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
            const product = response.body
            const modalProduct = `
                <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <p class="card-text"> Nombre: ${product.title} </p>
                                    <p class="card-text"> Año: ${product.price} </p>
                                    <p class="card-text"> Año: ${product.description} </p>
                                    
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
            document.getElementById('viewModal').innerHTML = modalProduct
                const modal = new bootstrap.Modal(
                    document.getElementById('modalProduct')
                )
                modal.show()
            }
            else {
                document.getElementById('info').innerHTML = '<h3> No se encontro el producto en la api</h3>'
            }
        })
}