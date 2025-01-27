import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousal from '../components/Carousal'

function Home() {

  const [foodCat,setFoodCat]=useState([]);

  const [foodItems,setFoodItems]=useState([]);

  const [search,setSearch] = useState("");

  const loadData=async()=>{
    let response=await fetch("http://localhost:4000/api/foodData",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
    })

    let data=await response.json();

    setFoodItems(data[0])
    setFoodCat(data[1])
  }

  useEffect(()=>{
    loadData();
  },[])

  return (
    <div>
      <div>
         <Navbar/>
      </div>

      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
        <div className="carousel-inner" id="carousel">

            <div className='carousel-caption' style={{zIndex:"6"}}>
                <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>

                <button className="btn btn-outline-success text-white bg-success " type="submit">Search</button>
                </div>
            </div>

        <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/300×300/?pizza" className="d-block w-100" alt="..." style={{filter:"brightness(30%)" }}/>
        </div>

        <div className="carousel-item">
            <img src="https://source.unsplash.com/random/300×300/?burger" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
        </div>

        <div className="carousel-item">
            <img src="https://source.unsplash.com/random/300×300/?donuts" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
        </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
        </button>
     </div>
      </div>

      <div className='container'>
         {
           foodCat.length>0
           ?
           foodCat.map((obj,index)=>{
             return (
              <div className='row mb-3'>
                <div key={obj.id} className="fs-3 m-3">
                {obj.CategoryName}
                </div>
                <hr></hr>
                {
                  foodItems.length>0 ?
                  foodItems.filter((item)=>{
                   return (item.CategoryName===obj.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))
                  })
                  .map((filterItems)=>{
                    return (
                      <div key={filterItems.id} className="col-12 col-md-6 col-lg-3">
                        <Card foodItems={filterItems}
                         options={filterItems.options[0]}
                         foodName={filterItems.name}
                        >
                         </Card>
                      </div>
                    )
                  })
                  :<div>No such data</div>
                }
              </div>
             )
           })
           :""
         }   

      </div>

      <div><Footer/></div>
    </div>
  )
}

export default Home
