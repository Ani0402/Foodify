import mongoose from "mongoose";

const connectDB=async()=>{
   try{
     const DB_URL="mongodb+srv://cubickiller777:p54IvEcswy12TlR8@cluster0.b6wfed5.mongodb.net/foodapp?retryWrites=true&w=majority&appName=Cluster0"
 
     await mongoose.connect(DB_URL);
     console.log("Connected to MongoDB");
     const fetched_data = mongoose.connection.db.collection("food_items");
     const food_items=await fetched_data.find({}).toArray(function(err,data){
           if(err) console.log(err);
           else {
             console.log(data)
           }
     })
     
     const foodCategoryRes= await mongoose.connection.db.collection("foodCategory");

     const foodCategory = await foodCategoryRes.find({}).toArray(function(err,data){
      if(err) console.log(err);
           else {
             console.log(data)
           }
     })


     global.food_items=food_items;
     global.foodCategory=foodCategory;
   }
   catch(error){
    console.log("Error connecting to MongoDB",error)
   }
}

export default connectDB;