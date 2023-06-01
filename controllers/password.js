const User = require('../models/user');
const ForgotPasswordRequest = require('../models/forgotPassword');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../util/database');

function isNotValid(str) {
    if (str == undefined || str.length === 0) return true;
    else return false;
  }

exports.postForgotPassword = async (req, res, next) => {
    const { email } = req.body;
    if (isNotValid(email)) {
        return res
          .status(400)
          .send({ type: "error", message: "Invalid Form Data!" });
      }
  try {
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.SIB_API_KEY;

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const uuid = uuidv4();
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const createuser = await ForgotPasswordRequest.create({
      id: uuid,
      userId: user.id,
    });

    const sender = {
      email: 'rajkumarjangam@gmail.com',
      name: 'ExpenseBuzz',
    };

    const receivers = [
      {
        email: email,
      },
    ];

    const sendMail = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Reset Your Password',
      htmlContent: `<html><p>Click <a href="http://localhost:3000/password/resetpassword/${uuid}">here</a> to reset your password</p></html>`,
      params: {
        uuid: uuid,
      },
    });

    await Promise.all([createuser, sendMail]);

    res.status(200).json({ type: 'success', message: 'An email has been sent' });
  } catch (error) {
   
      console.log(error);
      res.status(500).send(error);
   
  }
};
