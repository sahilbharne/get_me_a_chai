"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDb"
import User from "@/models/User"


export const initiate = async (amount, to_username, paymentform) => {
 await connectDB()   
 //fetch the secret of the user who is getting the payment
    let user= await User.findOne({username: to_username})
    const secret = user.razorpaySecret
 var instance = new Razorpay({ key_id: user.razorpayId, key_secret: secret })



    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    //create a payment object which shows  pending payment in the database

    await Payment.create({oid: x.id, amount: amount/100, to_user: to_username, name: paymentform.name, message: paymentform.message})

    return x
}

export const fetchuser = async (username) => {
    await connectDB()
    let u = await User.findOne({username: username}).lean()
    if (!u) return null;
    return JSON.parse(JSON.stringify(u)); 
}

export const fetchpayments = async (username) => {
    await connectDB()
    let p = await Payment.find({ to_user: username })
  .sort({ amount: -1 })
  .limit(7)
  .lean();
    return JSON.parse(JSON.stringify(p)); 
}


export const updateProfile = async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)

    //if the usernaame is being updated, check if username is available
    if(oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if(u){
            return { error: "username already exists"}
        }
        await User.updateOne({email: ndata.email}, ndata)

        //now update all the usernames in the payments table
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
    }

    else{
        await User.updateOne({email: ndata.email}, ndata)
    }

    
}