const form =document.querySelector('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3000/user/signup',{
        name:e.target.name.value,
        email:e.target.email.value,
        password:e.target.password.value,
    }).then((response)=>{
        console.log(response)
        if(response.status===201){
            window.location.href = "../user/login";
        }
        else {
            throw { response: response };
          }
        console.log(response)
    }).catch((err)=>{
        notify(err.response.data);
        console.log(err);
    })

})