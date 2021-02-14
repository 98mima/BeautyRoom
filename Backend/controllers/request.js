const Request = require('../models/request');
const User = require('../models/user');

const { requestValidation } = require('../validation');

exports.getRequests = async (req, res, next) => {
  try {
    const req = await Request.find();//find vraca proizvod a ne kursor
    res.json({ Data: req });
  }
  catch (err) {
    res.json({ success: false });
  }
}

exports.getByUserId = async (req, res) => {
  try {
    const requests = await Request.find({korisnikid: req.params.userId})
    // const user = await User.findById(req.params.userId)
    res.json({ Data:requests, Success: true })
  }
  catch (err) {
    res.json({ Success: false });
    console.log(err);
  }
}

exports.addRequest = async (req, res, next) => {
  const { error } = requestValidation(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.korisnikid);
  console.log(req.body)
  const ime = user.name;
  const request = new Request({
    date: req.body.date.substring(0, 10 ),
    comment: req.body.comment,
    time: req.body.time,
    type: req.body.type,
    status: "neobradjen",
    korisnikid: req.body.korisnikid,
    korIme: ime,
    numberKor: user.number
  });
  try {
    const savedReq = await request.save();
    // const user = await User.findById(req.body.korisnikid)
    user.addReq(request)

    res.json({ Success: true, savedReq });
  }
  catch (err) {
      console.log(err)
    res.json({ Success: false, message: err });
  }
}

exports.rejectRequest = async (req, res, next) => {
  try {
    var myquery = { _id: req.body.reqId };
    var newvalues = { $set: { status: "odbijen" } };
    const savedReq = await Request.updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    })
    res.json({ Success: true });
  }
  catch (err) {
    res.json({ Success: false, message:err });
  }
} 

exports.acceptRequest = async (req, res, next) => {
  try {
    var myquery = { _id: req.body.reqId };
    var newvalues = { $set: { status: "potvrdjen" } };
    const savedReq = await Request.updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    })
    res.json({ Success: true });
  }
  catch (err) {
    res.json({ Success: false });
    console.log(err);
  }
}


exports.deleteRequest = async (req, res, next) => {
  try {
    // const reqZaSlanje = await Request.findById(req.body.reqId)
    const user = await User.findById(req.body.userId)
    user.removeReq(req.body.reqId)
    const request = await Request.findByIdAndRemove(req.body.reqId)//fja mongoosa
    res.json({ Success: true, message: "Obrisano!" });
  }
  catch (err) {
    res.json({ Success: false, message:err });
  }
} 