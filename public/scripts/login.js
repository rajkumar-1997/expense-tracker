

const form =document.querySelector('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
  
    axios
      .post('http://localhost:3000/user/login', {
        email: email,
        password: password,
      }).then((response)=>{
        if(response.status==200){
            window.location.href='../expense/expense';

        }
     else {
            throw { response: response };
          }
        console.log(response)
    }).catch((err)=>{
        // notify(err.response.data);
        console.log(err);
    })
})