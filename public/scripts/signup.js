const form =document.querySelector('form');

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    try {
      const  response= await  axios.post('http://localhost:3000/user/signup',{
            name:e.target.name.value,
            email:e.target.email.value,
            password:e.target.password.value,
             })
       
            console.log(response)
            if(response.status===200){
                window.location.href = "../user/login";
            }
            else {
                throw { response: response };
              }
            console.log(response)
    }
         
    
    catch(err){
        notify(err.response.data);
        console.log(err);
    }
    
    e.target.name.value="";
    e.target.email.value="";
    e.target.password.value="";


})