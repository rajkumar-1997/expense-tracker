

const proEle=document.getElementById('pro');
const userNameEle=document.getElementById('user-name');
const userEmailEle=document.getElementById('user-email');
const premiumFeature=document.getElementById('premium-feature');
const normalFeature=document.getElementById('normal-feature');
const rzpBtn=document.getElementById('rzp-button');
// const leaderbordBtn2 = document.getElementById("leaderboard-btn2");
const leaderbordBtn=document.getElementById('leaderboard-btn');
const userContainer=document.getElementById('user-container');
const downloadBtn=document.getElementById('download-btn');
const showHistoryBtn=document.getElementById("download-history-btn");
// const showHistoryBtn2 = document.getElementById("download-history-btn2");
const leaderboardHeading=document.getElementById('leaderboard-heading');
const historyHeading=document.getElementById('history-heading');
const flexContainer = document.getElementById("flex-container");
const paginationContainer = document.getElementById("pagination-container");
const  leaderboardExpenseContainer = document.getElementById("leaderboard-expense-container");
const  leaderboardContainer = document.getElementById("leaderboard-container");
 const  leaderboardExpenseBar=document.getElementById('leaderboard-expense-bar')
// Replace 'nav' with the actual ID of your navigation element
const historyContainer=document.getElementById('history-container');
const historyExpenseBar=document.getElementById('history-expense-bar');

const userBtn=document.getElementById('user-btn');
const user=document.getElementById('user');




////////////////////////premium check///////////////////

async function premiumOrNot() {
  try {
    const token = localStorage.getItem("sessionToken");

    const response = await axios.get("http://54.161.242.20:3000/user/premium-check", {
      headers: {
        Authorization: token,
      },
    });

    if (response.status === 200) {
      const { isPremium, userName, userEmail } = response.data;
      
      if (isPremium) {
        console.log(response.data);
        enablePremium();
      } else {
        disablePremium();
      }
      
      userNameEle.innerText = capitalizeName(userName);
      userEmailEle.innerText = userEmail;
    }
  } catch (err) {
    console.log(err);
    notify(err.response.data);
  }
}




function capitalizeName(name) {
  return name
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}

document.addEventListener("DOMContentLoaded", premiumOrNot);


function enablePremium() {
  proEle.innerText = "premium";
  nav.style.visibility = "visible"; // Commented out as nav variable is not defined in the provided code
  premiumFeature.style.display = "flex";
  normalFeature.style.display = "none";
  

 
  // leaderbordBtn2.addEventListener("click", leaderbordHandler);
 
}

let leaderboard=true;
const openLeaderBoard=function(){
  if( leaderboard){
    leaderbordHandler();
    leaderbordBtn.classList.add('pactive');
    leaderboard=false;
    historyContainer.style.display='none';
    showHistoryBtn.classList.remove('pactive');
   
  }
  else if( showHistoryBtn.classList.contains('pactive')){
    openDownloadHistory();
  }
  else{
    plusBtn.style.display='flex';
    paginationContainer.style.display='flex';
    dailyContainer.style.display='block';
   
    leaderboardContainer.style.display='none';
    nav.style.display='flex';
    leaderboard=true;
    leaderbordBtn.classList.remove('pactive');
    navMonthlyBtn.classList.remove('active');
    navYearlyBtn.classList.remove('active');
    navDailyBtn.classList.add('active');
  }
}
function disablePremium() {
  nav.style.visibility='hidden'; // Commented out as nav variable is not defined in the provided code
  normalFeature.style.display = "block";
  premiumFeature.style.display = "none";
 
  rzpBtn.addEventListener('click', createOrder);

}


 
function leaderbordHandler(){
  const token=localStorage.getItem('sessionToken');

  axios.get('http://54.161.242.20:3000/expense/leaderboard',{
    
      headers:{
        Authorization:token,
      
    }
  }).then((response)=>{
    if(response.status==200){
      console.log(response.data);
     
     
      plusBtn.style.display='none';
      paginationContainer.style.display='none';
      dailyContainer.style.display='none';
      monthlyContainer.style.display='none';
      yearlyContainer.style.display='none';
      leaderboardContainer.style.display='block';
      nav.style.display='none';
      leaderboardExpenseBar.innerHTML = "";
      userContainer.classList.remove('show-user');
      
      // flexContainer.style.transform="translateX(-1650px)";
    //  display(true,false);
     response.data.userWiseExpense.forEach((userExpense,index)=>{
      if(userExpense.id==response.data.userId){
        showLeaderboard(userExpense,index);
      }
      else {
        showLeaderboard(userExpense,index);
      }
     })

    }
    else {
      throw { response: response };
    }
  }) .catch((err) => {
    console.log(err);
    notify(err.response.data);
  });
}

function showLeaderboard(leaderboardData,index) {
  

  

  const textNode = `
  <div class="bar">
    <div class="name"><span>${index+1}. </span>${capitalizeName(leaderboardData.name)}</div>
    <div class="total">${
      leaderboardData.userTotalExpense == null
        ? 0
        : leaderboardData.userTotalExpense
    } &#x20B9;</div>
  </div>
`;
leaderboardExpenseBar.insertAdjacentHTML('beforeend',textNode);
}



 


// function display(leaderboard,history){
//   if(leaderboard){
//     showHistoryBtn2.style.visibility = "visible";
//     leaderboardHeading.style.display = "inline-block";
//   }
//   else {
//     showHistoryBtn2.style.visibility = "hidden";
//     leaderboardHeading.style.display = "none";
//   }
//   if (history) {
//     leaderbordBtn2.style.visibility = "visible";
//     historyHeading.style.display = "inline-block";
//   } else {
//     leaderbordBtn2.style.visibility = "hidden";
//     historyHeading.style.display = "none";
//   }
// }
let isclicked=true;
const showhideprofile=function(){
    if(isclicked){
        user.style.display='block';
        isclicked=false;
  // normalFeature.style.display='block';
    }
    else{
      user.style.display='none';
      isclicked=true;
    }
}


async function downloadReport(e){
  downloadBtn.classList.add('pactive');
  downloadBtn.firstElementChild.className = "fa fa-spinner fa-pulse";
  try {
    const token=localStorage.getItem('sessionToken');

  const response=await axios.get('http://54.161.242.20:3000/expense-file/download',{
    headers:{
      Authorization:token,
    }
  })
  if(response.status==200){
    let a=document.createElement('a');
    console.log(response.data.fileUrl)
    a.href=response.data.fileUrl;
    a.download='temp.csv';
    await a.click();
  }
  else{
    alert("Some thing went wrong try after some time");
  }
 
  } catch (error) {
    notify(error.response.data);
     console.log(error);
  } 
 
    downloadBtn.firstElementChild.className = "fa fa-download";
    downloadBtn.classList.remove('pactive');
  
}
downloadBtn.addEventListener('click', downloadReport);





let historyopen=true;
const openDownloadHistory=function(){
  if(historyopen){
    showHistoryHandler();
    showHistoryBtn.classList.add('pactive');
    historyopen=false;
    leaderboardContainer.style.display='none';
    leaderbordBtn.classList.remove('pactive');
    

  }
  else if( leaderbordBtn.classList.contains('pactive')){
    openLeaderBoard();
  }
  else{
    plusBtn.style.display='flex';
    paginationContainer.style.display='flex';
    dailyContainer.style.display='block';
   
    historyContainer.style.display='none';
    nav.style.display='flex';
    historyopen=true;
    showHistoryBtn.classList.remove('pactive');
    navMonthlyBtn.classList.remove('active');
    navYearlyBtn.classList.remove('active');
    navDailyBtn.classList.add('active');
  }

}
async function showHistoryHandler(){
  try {
    const token=localStorage.getItem('sessionToken');
    const response=await axios.get('http://54.161.242.20:3000/expense-file/download-history',{
      headers:{
        Authorization:token,
      }
    });
    if(response.status==200){
      console.log(response.data);
     
     
      plusBtn.style.display='none';
      paginationContainer.style.display='none';
      dailyContainer.style.display='none';
      monthlyContainer.style.display='none';
      yearlyContainer.style.display='none';
      historyContainer.style.display='block';
      nav.style.display='none';
      historyExpenseBar.innerHTML = "";
      userContainer.classList.remove('show-user');

      response.data.expenseFiles.forEach((each)=>{
        showHistory(each);
      })
    }
    else{
      throw {response:response};
    }

    
  } catch (error) {
    console.log(error);
    notify(error.response.data);
  }
}

// formating date local
function formatDate(date) {
  const daysPassed = Math.round((new Date() - date) / (1000 * 60 * 60 * 24));

  if (daysPassed === 0) return "Today";
  else if (daysPassed === 1) return "Yesterday";
  else if (daysPassed <= 3) return `${daysPassed} days ago`;
  else {
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-IN", options).format(date);
  }
}
function showHistory(historyData){
  const downloadedOn = formatDate(new Date(historyData.createdAt));
  // console.log(historyData);
  const textNode=`<div class="bar">
  <div class="downloaded-time">${downloadedOn }</div>
  <div class="link"><a href="${historyData.fileUrl}" download><button><i class="fa fa-download fa-lg" aria-hidden="true"></i
    ></button></a></div>
  </div> `

  historyExpenseBar.insertAdjacentHTML('beforeend',textNode);
}



async function createOrder(e) {
  e.preventDefault();
  const token = localStorage.getItem("sessionToken");

  try {
    const response = await axios.get(
      "http://54.161.242.20:3000/order/create-OrderId",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const options = {
      key: response.data.key_id,
      order_id: response.data.order_id,
      handler: async function (response) {
        try {
          await axios.post(
            "http://54.161.242.20:3000/order/verify",
            {
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );
          notify({
            type: "success",
            message: "Congratulations Your are a premium user now",
          });
          premiumOrNot();
        } catch (err) {
          console.log(err);
          notify(err.response.data);
        }
      },
    };

    const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault()

        rzp1.on("payment.failed" , async (response) => {
          const order_id = response.error.metadata.order_id; 
            await axios.post('http://54.161.242.20:3000/order/verify',{
                order_id : order_id
            },  {
              headers: {
                Authorization: token,
              },
            })
            notify({ type: "error", message: "Transaction Failed! Try Again." });
            premiumOrNot();
        })
  } catch (err) {
    console.log(err);
    notify(err.response.data);
  }
}


document.querySelector('#logout').onclick = () => {
  localStorage.removeItem('sessionToken')
  window.location.href = "../user/login";
}


