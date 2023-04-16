const name = document.querySelector('#name')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const password = document.querySelector('#password')
const image = document.querySelector('#image')
const conf_pass = document.querySelector('#conf-pass')
const signupBtn = document.querySelector('#signup-btn')


signupBtn.addEventListener('click',()=>{
    fetch('/signup',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            phone: phone.value,
            password: password.value,
            confirmPassword: conf_pass.value,
            type: 'user',
            img_url: image.value
        })
    })
})