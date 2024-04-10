import express from "express";

const router=express.Router();

router.post('/foodData',(req,res)=>{
  try{
     res.send([global.food_items,global.foodCategory])
  }
  catch(error){
    console.log("Error in fetching food data",error);
    res.json({message: "Server error"})
  }
})

export default router;