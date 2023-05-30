

const RazorPay = require("razorpay")

const dotenv =  require("dotenv");
dotenv.config()

const Order = require("../models/order")

exports.purchasepremium = async (req,res,next) => {
    try{
        const user = req.user
        var rzp = await  new RazorPay({
            key_id : process.env.RZP_KEY_ID,
            key_secret : process.env.RZP_KEY_SECRET
        })     
    
        const amount = 2500;

        const order = await rzp.orders.create({
            amount : amount,
            currency : "INR"
        })
        const createOrder =  await user.createOrder({
            orderId : order.id,
            status : "PENDING"
        })
        return res.status(200).json({order_id : order.id, key_id : rzp.key_id}) 
    }
    catch(err){
        console.log(err);
    }
}

exports.updateTransaction =  async (req,res,next) => {
    try{
        const user = req.user;
        let status;
        let isPremium ;
        const { order_id, payment_id } = req.body ;
        if(!payment_id){
            status = "FAILED"
            isPremium = false
        }else{
            status = "SUCCESSFUL"
            isPremium = true
        }

        const order = await Order.findOne({ where : { orderId : order_id } })

         order.update({ paymentId : payment_id, status : status })
        .then(()=>{
            if(status){
                return res.status(200).json({ success : true, message : "Transaction Successful"})
            }else{
                return res.status(400).json({ success : false, message : "Transaction Failed"})
            }
        })

    }
    catch(err){
        console.log(err);
    }
    
}


