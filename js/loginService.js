document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email, password)
})

function login(email, password) {
    let message = ''
    let alerttype = ''
    const PLATZI_ENDPOINT = 'https://api.escuelajs.co/api/v1/auth/login'
    fetch(PLATZI_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            if (response.status === 201) {
                alerttype = 'success'
                message = 'Inicio de sesión exitoso'
                alertBuilder(alerttype, message)
                response.json().then((data) =>(
                    localStorage.setItem('token', data.token)
                    ))
                    setTimeout(() => {
                        location.href = 'admin/dashboard.html'
                    }, 2000)
            }
            else {
                alerttype = 'danger'
                message = 'Correo o contraseña inválidos'
            }
            console.log('respuesta de servicio', response)
            alertBuilder(alerttype, message)

        })
        .catch((error) => {
            alerttype = 'danger'
            message = 'Ocurrio un error inesperado'
            console.log('error de servicio', error)
            alertBuilder(alerttype, message)
        })

}

function alertBuilder(alerttype, message) {
    const alert = `
                <div class="alert alert-${alerttype} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`

    document.getElementById('mensaje').innerHTML = alert

}