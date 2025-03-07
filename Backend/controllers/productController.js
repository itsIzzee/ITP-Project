exports.getProducts = (req,res,Next)=>{   //this is the handler function
    res.status(200).json({
        success : true,
        message : "This route will show the all the product in the database "
    })
}