// const { notify } = require("../../routes/user");



const plusBtn = document.getElementById('plus-btn');
const crossBtn=document.getElementById('cross-btn');
const addExpenseContainer=document.getElementById('add-expense-container');
const addExpenseEle=document.getElementById('add-expense')
const form=document.querySelector('form');
const nav=document.querySelector('#nav');

const navDailyBtn=document.getElementById('nav-daily-btn');
const navMonthlyBtn=document.getElementById('nav-monthly-btn');
const navYearlyBtn=document.getElementById('nav-yearly-btn');


const dailyContainer=document.getElementById('daily-container');
const yearlyContainer=document.getElementById('yearly-container');
const monthlyContainer=document.getElementById('monthly-container');


const dailyExpenseContainer=document.getElementById('daily-expense-container');
const yearlyExpenseContainer=document.getElementById('yearly-expense-container');
const monthlyExpenseContainer=document.getElementById('monthly-expense-container');
const barDesBtn=document.getElementById('bar-des-btn');
const des =document.getElementById('des');
const eyeOpen=document.getElementById('eye-open');
const eyeClose=document.getElementById('eye-close');

const dateEle=document.getElementsByClassName('date');
const monthEle=document.getElementsByClassName('month');
const yearEle=document.getElementsByClassName('year');

const dailyInfoBar=document.getElementById('daily-info-bar');
const monthlyInfoBar=document.getElementById('monthly-info-bar');
const yearlyInfoBar=document.getElementById('yearly-info-bar');

const dailySum=document.getElementById('daily-sum');
const monthlySum=document.getElementById('monthly-sum');
const yearlySum=document.getElementById('yearly-sum');

// const userBtn = document.getElementById("user-btn");
const pageInfo = document.getElementById("page-info");
const pageBtns = document.querySelector(".page-btns");
const pageLeftBtn = document.getElementById("page-btn-left");
const pageRightBtn = document.getElementById("page-btn-right");
const rowsPerPageInput = document.getElementById("rows-per-page");

plusBtn.addEventListener('click',()=>{
    plusBtn.style.display='none';
    crossBtn.style.display='flex';
   
    addExpenseContainer.style.display='block';
})
crossBtn.addEventListener('click',()=>{
    plusBtn.style.display='flex';
    crossBtn.style.display='none';
    addExpenseContainer.style.display='none';
})


eyeOpen.addEventListener('click',()=>{
    eyeOpen.style.display='none';
    eyeClose.style.display='block';
    des.style.display='block';
})
eyeClose.addEventListener('click',()=>{             //we have to make this dynamic
    eyeOpen.style.display='block';
    eyeClose.style.display='none';
    des.style.display='none';
})


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


//   dailyExpenseContainer.addEventListener('click',(e)=>{
//     if (e.target.classList.contains("bar-des-btn")) {
//         e.target.parentElement.nextElementSibling.classList.toggle("show");
//       }
//   })


// nav.addEventListener("click", (e) => {
//     if (e.target.classList.contains("nav-btn")) {
//       removeActive();
//       e.target.classList.add("active");
//     }
     
//   });

navDailyBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  dailyContainer.style.display='block';
  navDailyBtn.classList.add('active');
  navMonthlyBtn.classList.remove('active');
  navYearlyBtn.classList.remove('active');
  monthlyContainer.style.display='none';
  yearlyContainer.style.display='none';
})
navMonthlyBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  dailyContainer.style.display='none';
  monthlyContainer.style.display='block';
  navDailyBtn.classList.remove('active');
  navMonthlyBtn.classList.add('active');
  navYearlyBtn.classList.remove('active');
  yearlyContainer.style.display='none';
})
navYearlyBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  dailyContainer.style.display='none';
  monthlyContainer.style.display='none';
  yearlyContainer.style.display='block';
  navDailyBtn.classList.remove('active');
  navMonthlyBtn.classList.remove('active');
  navYearlyBtn.classList.add('active');
})

dailyInfoBar.addEventListener('click',(e)=>{
  if(e.target.closest('.left-btn')){
    pageBtns.id=1;
    dateEle.id-=1;
    loadDailyExpenseData(dateEle.id,1)
  }
  if (e.target.closest(".right-btn")) {
    pageBtns.id = 1;
    dateEle.id = dateEle.id + 1;
    loadDailyExpenseData(dateEle.id, 1);
  }
})


window.addEventListener("DOMContentLoaded", loadExpenseData);

function loadExpenseData() {
  loadDailyExpenseData(0, 1);
  // pageBtns.id = 1;
}

function  loadDailyExpenseData(dateNumber, page){
 
     const token=localStorage.getItem('sessionToken');
     axios.get(`http://localhost:3000/expense/get-by-date?dateNumber=${dateNumber}`,
     {
      headers: {
        Authorization: token,
      },
    }
    ).then((response)=>{
      if(response.status==200){
        const { expenses, date, totalAndCount } = response.data;
        console.log(date);
        dailyExpenseContainer.innerText = "";
        dateEle[0].innerText = date;
        if (totalAndCount.total) {
          dailySum.innerText = totalAndCount.total;
        } else {
          dailySum.innerText = 0;
        }

        expenses.forEach((expense) => {
          showDailyExpense(expense,date);
        });


      }
      else {
        throw { response: response };
      }
    }).catch((error)=>{
        console.log(error)
    })
}


//show output on frontend

function showDailyExpense(expenseData){
  
  const textNode=` <div class="expense-bar">
  <div class="bar">
      <button class="bar-des-btn" id="bar-des-btn">${expenseData.category}<svg id="eye-open" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
      </svg> <svg id="eye-close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
      </svg></button>
      <div class="amount">${expenseData.amount} nbsp;<i class="fa fa-inr" aria-hidden="true" style="font-size: 0.95rem;"></i></div>
     
      <div class="bar-btn">
          <button class="bar-delete-btn"  id="${expenseData.id}">Delete</button>
      </div>
      
  </div>
  <div class="description" id="des">${expenseData.description}</div>
</div>`

dailyExpenseContainer.innerHTML += textNode;
}


form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const token=localStorage.getItem('sessionToken');
  console.log(dateEle[0].id);
  axios.post(`http://localhost:3000/expense/addexpense?dateNumber=${dateEle[0].id}`,{
    category: e.target.category.value,
    amount: e.target.amount.value,
    description: e.target.description.value,
  },
  {
    
      headers: {
        Authorization: token,
      },
    
  }
  
  ).then((response)=>{
    if(response.status===201){
      // notify(response.data.notification);
      // // showDailyExpense(response.data.expense);
      // dailySum.innerHTML = "<i class='fa fa-refresh' aria-hidden='true'></i>";
      // e.target.category.value = "";
      // e.target.amount.value = "";
      // e.target.description.value = "";
    }
    else {
      throw { response: response };
    }
  }).catch((error)=>{
    console.log(error);
    // notify(err.response.data);
  });
  dailySum.innerHTML = "<i class='fa fa-refresh' aria-hidden='true'></i>";
  e.target.category.value = "";
  e.target.amount.value = "";
  e.target.description.value = "";
  
});












