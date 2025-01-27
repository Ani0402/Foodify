import React, { useContext, useReducer } from 'react'
import { createContext } from 'react'

const CartStateContext=createContext()
const CartDispatchContext=createContext()

const reducer=(state,action)=>{
   switch(action.type)  {
     case "ADD":
        return [...state,{id:action.id,name:action.name,price:action.price,quantity:action.quantity,size:action.size,img:action.img}]

      case "REMOVE":
        let newArr=[...state]
        newArr.splice(action.index,1)
        return newArr;

       case "DROP":
          let emptyArr=[]
          return emptyArr
          
       case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, quantity: parseInt(action.quantity) + food.quantity, price: action.price + food.price }
                }
                return arr
            })
            return arr
            
     default:
        console.log("error")
   }
}

export const CartProvider=({children})=>{
  
    const [state,dispatch] = useReducer(reducer,[])

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
            {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
          
    )
}

export const useCart=()=>useContext(CartStateContext)
export const useDispatchCart=()=>useContext(CartDispatchContext)

