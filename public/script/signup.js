const name = document.querySelector('#name')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const password = document.querySelector('#password')
const image = document.querySelector('#image')
const conf_pass = document.querySelector('#conf-pass')
const signupBtn = document.querySelector('#signup-btn')
const errorDiv = document.querySelector('.error')


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
    }).then(data => data.json())
    .then(data => {
        if(!data.error){
            window.location.href = '/'
        }
        else if(typeof data.message == 'string'){
            errorDiv.textContent = ''
            const errMessage = document.createElement('p')
            errMessage.style.color = 'white'
            errMessage.style.backgroundColor = 'red'
            errMessage.textContent = data.message
            errorDiv.appendChild(errMessage)
        }
        else{
            console.log(data);
            errorDiv.textContent = ''
            const errMessage = document.createElement('p')
            errMessage.style.color = 'white'
            errMessage.style.backgroundColor = 'red'
            errMessage.textContent = data.message[0].message
            errorDiv.appendChild(errMessage)
        }
    })
    .catch(err => {
        console.log(err);
    })
})