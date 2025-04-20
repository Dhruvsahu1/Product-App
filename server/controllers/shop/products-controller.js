const Product = require('../../models/product')





const getFilteredProducts = async (req, res) => {
    try{

        const products = await Product.find({})

        res.status(200).json({
            success: true,
            data: products
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message:"some Error Occured"
        })
    }
}


module.exports = {getFilteredProducts}