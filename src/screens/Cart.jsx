import { useDispatchCart,useCart } from '../components/ContextReducer';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Cart(){

 let data=useCart()
 let dispatch=useDispatchCart()

 if(data.length===0){
    return (
        <div>
           <div className="m-5 w-100 text-center fs-3">The cart is empty!</div>
        </div>
    )
 }
 
 const handleCheckout=async()=>{
    let userEmail=localStorage.getItem('userEmail')

    let response=await fetch("http://localhost:4000/api/orderData",{
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        order_data:data,
        email:userEmail,
        order_date:new Date().toDateString()
      })
    })
    

    if(response.status===200){
      dispatch({type:"DROP",})
    }
 }

 let totalPrice=data.reduce((total,food)=> total+food.price,0)

 return (
    <div>

      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>

          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>

          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>

        </table>

        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>

        <div className='btn bg-success mt-5' onClick={handleCheckout}>
          Check Out
        </div>
      </div>

    </div>
 )
}