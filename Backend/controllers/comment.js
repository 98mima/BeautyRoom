const Product = require('../models/product');
const Comment = require('../models/comment');
const { commentValidation } = require('../validation');

exports.getComments = async (req, res, next) => {
  try{
    const comments = await Comment.find();
    const products = await Product.find().sort({"title": 1})
    res.json({Data:comments, products: products});
    }
    catch(err){
      res.json({Success: false});
    }
}

exports.addComment = async (req, res, next) => {
  const { error } = commentValidation(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

    try {
        const product = await Product.findOne({title: req.body.nameProduct});  
        const comment = new Comment({
            content: req.body.content,
            nameProduct: req.body.nameProduct,
            productid: product._id,
            korisnikid: req.body.korisnikid
        });
        const savedComm = await comment.save()
        res.json({ Success: true, savedComm });
        return product.addComment(comment)
    }
  catch(err){
    res.json({Success: false});
  }
};

exports.deleteComment = async (req, res, next) => {
  const comm = await Comment.findByIdAndRemove(req.params.commId)//fja mongoosa
  try{
    res.json({Success: true,  message:"Obrisano!"});
  } 
  catch(err){
    res.json({success: false});
  } 
}

