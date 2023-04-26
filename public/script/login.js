const email = document.querySelector('#email')
const password = document.querySelector('#password')
const loginBtn = document.querySelector('#login-btn')
const errorDiv = document.querySelector('.error')

loginBtn.addEventListener('click', () => {
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })


    })
        .then(data => data.json())
        .then(data => {
            if (!data.error) {
                console.log('hello');
                window.location.href = '/'
            }
            else if (typeof data.message == 'string') {
                errorDiv.textContent = ''
                const errMessage = document.createElement('p')
                errMessage.style.color = 'white'
                errMessage.style.backgroundColor = 'red'
                errMessage.textContent = data.message
                errorDiv.appendChild(errMessage)
            }
            else {
                console.log(data);
                errorDiv.textContent = ''
                const errMessage = document.createElement('p')
                errMessage.style.color = 'white'
                errMessage.style.backgroundColor = 'red'
                errMessage.textContent = data.message[0].message
                errorDiv.appendChild(errMessage)
            }
        })
        .catch(err => console.log(err))
})