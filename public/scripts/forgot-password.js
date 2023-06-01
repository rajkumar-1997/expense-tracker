const emailInput=document.getElementById('email');

const resetPasswordBtn=document.getElementById('resetpassbtn')

// const url  = "https://expense-tracker-5h0p.onrender.com";
// const Email = document.querySelector('#email')
document.addEventListener("DOMContentLoaded",()=> {
resetPasswordBtn.addEventListener('click',async(e)=>{

    try{
        e.preventDefault()
        const email = emailInput.value;
        const response = await axios.post('http://localhost:3000/password/forgotpassword', {
            email : email
        })
        if(response.status==200){
      
        emailInput.value="";
        window.alert('email sent plz check')
        }
    }
    catch(err){
        console.log(err);
    }
})
})


   
    

    
