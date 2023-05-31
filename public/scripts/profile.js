
const navBtns=document.querySelectorAll('.nav-btn');
const proEle=document.getElementById('pro');
const userNameEle=document.getElementById('user-name');
const userEmailEle=document.getElementById('user-email');
const premiumFeature=document.getElementById('premium-feature');
const normalFeature=document.getElementById('normal-feature');
const rzpBtn=document.getElementById('rzp-button');
const leaderbordBtn2 = document.getElementById("leaderboard-btn2");
const leaderbordBtn=document.getElementById('leaderboard-btn');
const userContainer=document.getElementById('user-container');
const downloadBtn=document.getElementById('download-btn');
const showHistoryBtn=document.getElementById("download-history-btn");
const showHistoryBtn2 = document.getElementById("download-history-btn2");
const leaderboardHeading=document.getElementById('leaderboard-heading');
const historyHeading=document.getElementById('history-heading');
const flexContainer = document.getElementById("flex-container");
const paginationContainer = document.getElementById("pagination-container");
const leaderboardContainer = document.getElementById( "leaderboard-expense-container");
const userBtn=document.getElementById('user-btn');
const user=document.getElementById('user');



////////////////////////premium check///////////////////

async function premiumOrNot() {
  try {
    const token = localStorage.getItem("sessionToken");

    const response = await axios.get("http://localhost:3000/user/premium-check", {
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
    // notify(err.response.data);
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
  leaderbordBtn.addEventListener("click", leaderbordHandler);
  leaderbordBtn2.addEventListener("click", leaderbordHandler);

 
}

function disablePremium() {
  nav.style.visibility='hidden'; // Commented out as nav variable is not defined in the provided code
  normalFeature.style.display = "block";
  premiumFeature.style.display = "none";
 
  rzpBtn.addEventListener('click', createOrder);

}
 
function leaderbordHandler(){
  const token=localStorage.getItem('sessionToken');

  axios.get('http://localhost:3000/expense/leaderboard',{
    
      headers:{
        Authorization:token,
      
    }
  }).then((response)=>{
    if(response.status==200){
      console.log(response.data);
      plusBtn.style.display='none';
      paginationContainer.style.display='none';
      const leaderBoardExpenseBar=document.getElementById('leadernoard-expense-bar');

     leaderBoardExpenseBar.innerText="";
      userContainer.classList.remove('show-user');
      
      // flexContainer.style.transform="translateX(-1650px)";
    //  display(true,false);
     response.data.userWiseExpense.forEach((userExpense)=>{
      if(userExpense.id==response.data.userId){
        showLeaderboard(userExpense, "background-color:#FF731D");
      }
      else {
        showLeaderboard(userExpense, "");
      }
     })

    }
    else {
      throw { response: response };
    }
  }) .catch((err) => {
    console.log(err);
    // notify(err.response.data);
  });
}

function showLeaderboard(leaderboardData, highlight) {
  const leaderBoardExpenseBar = document.getElementById('leadernoard-expense-bar');

  if (!leaderBoardExpenseBar) {
    console.error("Element with ID 'leadernoard-expense-bar' not found.");
    return;
  }

  const textNode = `
    <div class="bar">
      <div class="name">${leaderboardData.name}</div>
      <div class="total">${
        leaderboardData.userTotalExpense == null ? 0 : leaderboardData.userTotalExpense
      } &#x20B9;</div>
    </div>
  `;

  leaderBoardExpenseBar.insertAdjacentHTML('beforeend', textNode);
}



 


function display(leaderboard,history){
  if(leaderboard){
    showHistoryBtn2.style.visibility = "visible";
    leaderboardHeading.style.display = "inline-block";
  }
  else {
    showHistoryBtn2.style.visibility = "hidden";
    leaderboardHeading.style.display = "none";
  }
  if (history) {
    leaderbordBtn2.style.visibility = "visible";
    historyHeading.style.display = "inline-block";
  } else {
    leaderbordBtn2.style.visibility = "hidden";
    historyHeading.style.display = "none";
  }
}
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


async function createOrder(e) {
  e.preventDefault();
  const token = localStorage.getItem("sessionToken");

  try {
    const response = await axios.get(
      "http://localhost:3000/order/create-OrderId",
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
            "http://localhost:3000/order/verify",
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
          window.alert("You are now a premium user.");
          premiumOrNot();
        } catch (err) {
          console.log(err);
          // notify(err.response.data);
        }
      },
    };

    const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault()

        rzp1.on("payment.failed" , async (response) => {
          const order_id = response.error.metadata.order_id; 
            await axios.post('http://localhost:3000/order/verify',{
                order_id : order_id
            },  {
              headers: {
                Authorization: token,
              },
            })
            alert("Payment Failed");
            premiumOrNot();
        })
  } catch (err) {
    console.log(err);
    // notify(err.response.data);
  }
}


