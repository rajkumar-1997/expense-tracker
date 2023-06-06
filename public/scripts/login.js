

const form =document.querySelector('form');

form.addEventListener('submit',async(e)=>{
    e.preventDefault();

    try {
      
    const email = e.target.email.value;
    const password = e.target.password.value;
  
  const response= await  axios.post('http://54.161.242.20:3000/user/login', {
                       email: email,
                      password: password,
                      })
        if(response.status==200){
            localStorage.setItem("sessionToken",response.data.sessionToken);
            window.location.href='../expense/addexpense';

        }
     else {
            throw { response: response };
          }
        console.log(response)
    } catch (error) {
      notify(error.response.data);
        console.log(error);
    }

    
})