const email = document.querySelector('#email')
const password = document.querySelector('#password')
const loginBtn = document.querySelector('#login-btn')

loginBtn.addEventListener('click',()=>{
    fetch('/login',{
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
        
        
    })
     .then(response => {if(response.ok){
        window.location.href = '/'
     }})
    .catch(err => console.log(err))
})