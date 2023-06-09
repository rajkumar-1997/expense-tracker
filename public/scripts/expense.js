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
// const des =document.getElementById('des');
// const eyeOpen=document.getElementById('eye-open');
// const eyeClose=document.getElementById('eye-close');

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
const plusCrossBtnDiv=document.getElementById('plus-cross-btn-div');

const date = new Date();
 
  const year = date.getFullYear();
  const month = date.toLocaleString('en-IN', { month: 'long' });
  const day = date.getDate().toString().padStart(2, '0');
  const initialDate= ` ${day} ${month} ${year}`;
  const initialMonth=`${month} ${year}`;
  const initialYear=`${year}`


console.log(initialDate);
  dateEle[0].innerText = initialDate;

  monthEle[0].innerText = initialMonth;

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


function eyeOpenFunc(id1,id2,id3){
  eyeOpen=document.getElementById(id1);
  eyeClose=document.getElementById(id2);
  des=document.getElementById(id3);
    eyeOpen.style.display='none';
    eyeClose.style.display='block';
    des.style.display='flex';

}
function eyeCloseFunc(id1,id2,id3){            //we have to make this dynamic
  eyeOpen=document.getElementById(id1);
  eyeClose=document.getElementById(id2);
  des=document.getElementById(id3);
    eyeOpen.style.display='block';
    eyeClose.style.display='none';
    des.style.display='none';
}


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




navDailyBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  dailyContainer.style.display='block';
  navDailyBtn.classList.add('active');
  navMonthlyBtn.classList.remove('active');
  navYearlyBtn.classList.remove('active');
  monthlyContainer.style.display='none';
  yearlyContainer.style.display='none';
  // plusCrossBtnDiv.style.display='flex';
  // crossBtn.style.display='none';
  pageBtns.id=1;
  paginationContainer.style.display='block'
})
navMonthlyBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  
    dailyContainer.style.display='none';
    monthlyContainer.style.display='block';
    navDailyBtn.classList.remove('active');
    navMonthlyBtn.classList.add('active');
    navYearlyBtn.classList.remove('active');
    yearlyContainer.style.display='none';
    // plusCrossBtnDiv.style.display='none';
    paginationContainer.style.display='none'

})
navYearlyBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  
    dailyContainer.style.display='none';
    monthlyContainer.style.display='none';
    yearlyContainer.style.display='block';
    navDailyBtn.classList.remove('active');
    navMonthlyBtn.classList.remove('active');
    navYearlyBtn.classList.add('active');
    // plusCrossBtnDiv.style.display='none';
    paginationContainer.style.display='none'
 

})

dailyInfoBar.addEventListener('click',(e)=>{
  if(e.target.closest('.left-btn')){
    pageBtns.id=1;
    dateEle[0].id-=1;
    console.log(dateEle[0].id)
    loadDailyExpenseData(dateEle[0].id,1)
  }
  if (e.target.closest(".right-btn")) {
    pageBtns.id = 1;
    dateEle[0].id = +dateEle[0].id + 1;
    console.log(dateEle[0].id)
    loadDailyExpenseData(dateEle[0].id, 1);
  }
})


monthlyInfoBar.addEventListener('click',(e)=>{
  if(e.target.closest('.left-btn')){
    pageBtns.id=1;
    monthEle[0].id-=1;
    console.log(monthEle[0].id)
    loadMonthlyExpenseData(monthEle[0].id);
  }
  if (e.target.closest(".right-btn")) {
    pageBtns.id = 1;
    monthEle[0].id = +monthEle[0].id + 1;
    console.log(monthEle[0].id)
    loadMonthlyExpenseData(monthEle[0].id);
  }
})

yearlyInfoBar.addEventListener("click", (e) => {
  if (e.target.closest(".left-btn")) {
    yearEle[0].id -= 1;
    console.log(yearEle[0].id)
    loadYearlyExpenseData(yearEle[0].id);
  }
  if (e.target.closest(".right-btn")) {
    yearEle[0].id = +yearEle[0].id + 1;
    console.log(yearEle[0].id)
    loadYearlyExpenseData(yearEle[0].id);
  }
});




window.addEventListener("DOMContentLoaded", loadExpenseData);

function loadExpenseData() {
  loadDailyExpenseData(0,1);
  loadMonthlyExpenseData(0);
  loadYearlyExpenseData(0);
  pageBtns.id = 1; 
}

function loadYearlyExpenseData(yearNumber) {
  const token = localStorage.getItem('sessionToken');
  axios.get(`http://localhost:3000/expense/get-by-year?yearNumber=${yearNumber}`, {
    headers: {
      Authorization: token,
    }
  }).then((response) => {
    console.log(response.data);
    const yearlyExpenseBar = document.getElementById("yearly-expense-bar");
    yearlyExpenseBar.innerText = "";
    yearEle[0].innerText = response.data.year;
    yearlySum.innerText = response.data.yearlySum;
    if (response.status == 200) {
      const categoryWiseSums = response.data.categoryWiseSums;
      const monthlySum = response.data.monthlySum.map((object) => {
        const monthIndex = parseInt(object.month);
        object.month = getEnglishMonthName(monthIndex);
        return object;
      });
      categoryWiseSums.forEach((categoryWiseArrayObject) => {
        const month = categoryWiseArrayObject.month;
        const monthlySumData = monthlySum.find((object) => object.month === month);
        if (monthlySumData) {
          showYearlyExpense(categoryWiseArrayObject, monthlySumData, response.data.year);
        }
      });
    } else {
      throw { response: response };
    }
  }).catch((err) => {
    console.log(err);
    notify(err.response.data);
  });
}

function getEnglishMonthName(month) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month] || '';
}

function showYearlyExpense(categoryWiseArrayObject,monthlySumObj,year){




console.log(categoryWiseArrayObject);
const yearlyExpenseBar = document.getElementById("yearly-expense-bar");

if (categoryWiseArrayObject.length !== 0) {
  const division = document.createElement("div");
  division.className = "expense-bar-child";
  division.style.border = '1px solid black';
  division.style.borderRadius = '0.5rem';
  division.innerHTML = `<h3>${categoryWiseArrayObject.month} ${year} </h3>`;
  console.log(monthlySumObj)
  categoryWiseArrayObject.categories.forEach((object) => {
   
      const textNode = `<hr>
      <div class="bar monthly-bar ">
        <span>${object.category}</span>  
   
        <span>${object.sum}<i class="fa fa-inr" aria-hidden="true" style="font-size: 0.95rem;"></i></span>
      </div>
      
      <hr>`;
    
  
    division.insertAdjacentHTML('beforeend', textNode);

  });
  division.innerHTML+=`<div><h4 style="text-align:center; color:#06a0d2;;">${categoryWiseArrayObject.month}  Total Expense = ${monthlySumObj.totalMonthlyExpense}<i class="fa fa-inr" aria-hidden="true" style="font-size: 0.8rem;"></i></h4></div>`

  yearlyExpenseBar.appendChild(division)
}

yearlyExpenseContainer.appendChild(yearlyExpenseBar);
 
  
 
}

function loadMonthlyExpenseData(monthNumber) {
  const token = localStorage.getItem('sessionToken');
  

  axios.get(`http://localhost:3000/expense/get-by-month?monthNumber=${monthNumber}`, {
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 200) {
      // console.log(response.data);
      const { month, totalMonthlyExpense, expensesByDay } = response.data;

      const monthlyExpenseBar = document.getElementById("monthly-expense-bar");
      monthlyExpenseBar.innerText = "";
      monthEle[0].innerText = month;
      monthlySum.innerText = totalMonthlyExpense;

      expensesByDay.forEach((object) => {
        if (object.expenses.length !== 0) {
          showMonthlyExpense(object.expenses, object.date);
        }
      });
    } else {
      throw { response: response };
    }
  }).catch((err) => {
    console.log(err);
    notify(err.response.data);
  });
}


    function showMonthlyExpense(expenses, date) {
      // console.log(expenses);
      const monthlyExpenseBar = document.getElementById("monthly-expense-bar");
    
      if (expenses.length !== 0) {
        const division = document.createElement("div");
        division.className = "expense-bar-child";
        division.style.border = '1px solid black';
        division.style.borderRadius = '0.5rem';
        division.innerHTML = `<h3>${date}</h3>`;
    
        expenses.forEach((object) => {
          const textNode = `<hr>
            <div class="bar monthly-bar " >
              <span>${object.category}</span>  
              <span>${object.description}</span>
              <span>${object.amount}<i class="fa fa-inr" aria-hidden="true" style="font-size: 0.95rem;"></i></span>
            </div><hr>`;
           
          division.insertAdjacentHTML('beforeend', textNode);
        });
    
        monthlyExpenseBar.appendChild(division);
      }
    
      monthlyExpenseContainer.appendChild(monthlyExpenseBar);
    }
    
    
   
 


function updateDailySum(sum) {
  dailySum.innerText = sum || 0;
}


rowsPerPageInput.addEventListener('change',(e)=>{

  localStorage.setItem('rowsPerPage',e.target.value);
  loadDailyExpenseData(dateEle[0].id,pageBtns.id);
})
pageRightBtn.addEventListener('click',()=>{
  pageBtns.id=+pageBtns.id+1;
  loadDailyExpenseData(dateEle[0].id,pageBtns.id);

})

pageLeftBtn.addEventListener('click',()=>{
  pageBtns.id-=1;
  loadDailyExpenseData(dateEle[0].id,pageBtns.id);
})
 

function  loadDailyExpenseData(dateNumber, page){
      let rows=localStorage.getItem('rowsPerPage');
      if(rows==null){
        rows=5;
      } 
      rowsPerPageInput.value=rows;
     
     const token=localStorage.getItem('sessionToken');
     axios.get(`http://localhost:3000/expense/get-by-date?dateNumber=${dateNumber}&page=${page}&rows=${rows}`,
     {
      headers: {
        Authorization: token,
      },
    }
    ).then((response)=>{
      if(response.status==200){
        const { actualRows, expenses, date, totalAndCount } = response.data;
        // console.log(date);
        dailyExpenseContainer.innerText = "";
        dateEle[0].innerText = date;
       // Update the dailySum using the function
       updateDailySum(totalAndCount.total);

        expenses.forEach((expense) => {
          showDailyExpense(expense);
          loadMonthlyExpenseData(monthEle[0].id) ;
        });

         showPaginationInfo(page,rows,actualRows,totalAndCount.count)
      }
      else {
        throw { response: response };
      }
    }).catch((error)=>{
        console.log(error)
        notify(error.response.data);
    })
}


//show output on frontend

function showDailyExpense(expenseData){
  
  const textNode=` <div class="expense-bar">
  <div class="bar">
      <button class="bar-des-btn" id="bar-des-btn">${expenseData.category}<i class="fa-regular fa-eye"  id="${expenseData.id}-eye-open"  style="display:block;  font-size:1rem;" onClick=eyeOpenFunc("${expenseData.id}-eye-open","${expenseData.id}-eye-close","${expenseData.id}-des")></i><i class="fa-solid fa-eye-slash" id="${expenseData.id}-eye-close" style="display:none; font-size:1rem;"  onClick=eyeCloseFunc("${expenseData.id}-eye-open","${expenseData.id}-eye-close","${expenseData.id}-des")></i></button>
      <div class="amount"><span>${expenseData.amount} <i class="fa fa-inr" aria-hidden="true" style="font-size: 0.95rem;"></i></span></div>
     
      
          <button class="bar-delete-btn"  id=${expenseData.id}>Delete</button>
     
      
  </div>
  <div class="description" id="${expenseData.id}-des"  style="display:none;" >${expenseData.description}</div>
</div>`

dailyExpenseContainer.innerHTML += textNode;
}


function showPaginationInfo(page,rows,actualRows,totalCount){
  const offset=(page-1)*rows;
  const lastRow=(offset+actualRows) || 0;
  pageInfo.innerText=`${offset+1}-${lastRow} of ${(totalCount) || 0}`
  pageRightBtn.disabled=(lastRow>=totalCount);
  pageLeftBtn.disabled=(pageBtns.id==1);
}


dailyExpenseContainer.addEventListener('click',(e)=>{
  if(e.target.classList.contains('bar-delete-btn')){
    const token=localStorage.getItem('sessionToken');
    // console.log(`${e.target.id}`);

    axios.delete(`http://localhost:3000/expense/delete/${e.target.id}`,
    {
      headers:{
        Authorization:token,
      }
    }).then((response)=>{
      if(response.status==200){
        notify(response.data);
        e.target.parentElement.parentElement.remove();
        loadDailyExpenseData(dateEle[0].id, 1);
        loadMonthlyExpenseData(monthEle[0].id) ;
        loadYearlyExpenseData(yearEle[0].id) ;
        if (dailyExpenseContainer.children.length === 0) {
          // Update the dailySum with 0 since no expenses remain
          updateDailySum(0);
        }
      }
    }).catch((err) => {
      console.log(err);
      notify(err.response.data);
    });
  }
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const token = localStorage.getItem('sessionToken');
  // console.log(dateEle[0].id);
  axios
    .post(
      `http://localhost:3000/expense/addexpense?dateNumber=${dateEle[0].id}`,
      {
        category: e.target.category.value,
        amount: e.target.amount.value,
        description: e.target.description.value,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      if (response.status === 201) {
        notify(response.data.notification);
        // showDailyExpense(response.data.expense);
        
        e.target.category.value = "";
        e.target.amount.value = "";
        e.target.description.value = "";
         plusBtn.style.display='flex';
        crossBtn.style.display='none';
        addExpenseContainer.style.display='none';
        loadDailyExpenseData(dateEle[0].id, 1);
        loadMonthlyExpenseData(monthEle[0].id) ;// Load updated data
        loadYearlyExpenseData(yearEle[0].id);
       
      } else {
        throw { response: response };
      }
    })
    .catch((error) => {
      console.log(error);
      notify(error.response.data);
    });
});















