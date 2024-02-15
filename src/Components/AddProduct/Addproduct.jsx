import React, { useState } from 'react'
import './Addproduct.css'
import upload_area from '../../assets/upload_area.svg'
const Addproduct = () => {
    const[image,setImage]=useState(false);
    const[productDetails,setProductDetails]=useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })
    const imageHandler=(e)=>{
      setImage(e.target.files[0]);
    }
    const changeHandler=(e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    const Add_Product=async()=>{
     console.log(productDetails);
     let responseData;
     let product=productDetails;
     let formData=new FormData();
     formData.append('product',image);
     await fetch('http://localhost:4000/upload',{
      method:'POST',
      headers:{
        Accept:'application/json',
      },
      body:formData,
     }).then((resp)=>resp.json()).then((data)=>{responseData=data})
     if(responseData.success)
     {
      product.image=responseData.image_url;
      console.log(product)
      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          name:productDetails.name,
          category:productDetails.category,
          new_price:productDetails.new_price,
          old_price:productDetails.old_price,
          image:productDetails.image
        }),
      }).then((resp)=>resp.json()).then((data)=>{
         data.success?alert('Product Added'):alert('Failed')
      })
     }

    }
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Prodcut title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name"  placeholder='type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Old Price</p>
            <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
            <p>New Price</p>
            <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
        <option value="women">Women</option>
        <option value="Men">Men</option>
        <option value="Kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className="addproduct-thumnail-img" />
        </label>
        <input onChange={imageHandler} type="file"  name="im" id='file-input' hidden/>
      </div>
      <button onClick={()=>{Add_Product()}} className="addproduct-btn">ADD</button>
    </div>
  )
}

export default Addproduct;
