const cloudinary = require("../utils/cloudinary")
const productmodel = require("../model/product.model")

const AddProduct = async(req, res ) =>{
  try {
    const {name, description, stock, price, image} = req.body
    if (!name || !description || !stock || !price || !image) {
        return res.status(400).json({message:"All fields are mandatory", status:false})
    }
   const uploadimage =  await cloudinary.uploader.upload(image)
    console.log(uploadimage);
    
 const newProduct =   await productmodel.create({
        name,
        description,
        stock,
        price,
        image:uploadimage.secure_url
    })
    if (newProduct) {
        return res.status(200).json({message:"Product uploaded successfully",newProduct, status:false})
    }
  } catch (error) {
    console.log(error);
        return res.status(500).json({message:error.message, status:false})
    
  }
}

const Getallproduct = async (req, res) =>{
 try {
    console.log(req.query);
    const {page , limit} = req.query

   const skip =  parseInt(page - 1) * limit
   console.log(skip);
   
   const allproduct = await productmodel.find()
   .skip(skip) 
   .limit(limit)
   console.log(allproduct); return res.status(200).json({ allproduct, status:false})
   
 } catch (error) {
    
 }
}
module.exports = {AddProduct, Getallproduct}