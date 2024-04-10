import React, { useEffect, useState,useRef } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';


const Card = ({foodItems,options}) => {
  let data=useCart()
  let option=options;
  let priceOptions=Object.keys(option);
  let foodItem=foodItems
  const priceRef=useRef();
  let dispatch=useDispatchCart()
  const [quantity,setQuantity] = useState(1)
  const [size,setSize] = useState("")

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }

  const handleAddToCart=async()=>{
    let food=[];
    for (const item of data){
      if(item.id===foodItem._id){
        food=item
        break;
      }
    }
   console.log(food)
    if(food.length>0){
      if(food.size===size){
        await dispatch({type:"UPDATE",id:foodItem._id,quantity:quantity,price:finalPrice})
        return
      }
      else if(food.size!==size){
        await dispatch({type:"ADD",id:foodItem._id,name:foodItem.name,quantity:quantity,size:size,price:finalPrice})
        console.log("add vala if ke andar")
        return;
      }  
      return;
    }
     await dispatch({type:"ADD",id:foodItem._id,name:foodItem.name,quantity:quantity,size:size,price:finalPrice})
  }

  let finalPrice=quantity * parseInt(options[size])

  useEffect(()=>{
    
    setSize(priceRef.current.value)
  },[])
 
  return (
    <div>
        <div>
        <div className="card m-3 p-4" style={{width:"18rem",maxHeight:"360px"}}>
        <img src={foodItem.img} className="card-img-top" alt="..."  style={{height: "120px", objectFit: "fill" }}/>
        <div className="card-body">
            <h5 className="card-title">{foodItem.name}</h5>
            
            <div className="container w-100">
                <select className="m-2 h-100 bg-success rounded"  onChange={(e)=>setQuantity(e.target.value)}>
                    {
                    Array.from(Array(6),(e,i)=>{
                        return (
                            <option key={i+1} value={i+1}>{i+1}</option>
                        )
                    })
                    }
                </select>

                <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)} onClick={handleClick}>
                  {
                    priceOptions.map((item)=>{
                        return (
                            <option key={item} value={item}>{item}</option>
                        )
                    })
                  }
                </select>

                <div className="d-inline h-100 fs-5">&#8377;{finalPrice}/-</div>

            </div>
            <hr></hr>
            <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add To Cart</button>
        </div>
    </div>
        </div>
    </div>
  )
}

export default Card
