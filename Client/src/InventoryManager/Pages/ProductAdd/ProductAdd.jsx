import React from 'react'
import style from './ProductAdd.module.css'

const ProductAdd = () => {
  return (
    <div className={style.productPage}>
  <div className={style.card}>
    <h2>Add New Medicine</h2>
    <p className={style.subtitle}>
      Enter medicine details
    </p>

    <form className={style.form}>

      <div className={style.row}>
        <div className={style.field}>
          <label>Brand</label>
          <select>
            <option>Select Brand</option>
          </select>
        </div>

        <div className={style.field}>
          <label>Type</label>
          <select>
            <option>Select Type</option>
          </select>
        </div>
      </div>

      <div className={style.row}>
        <div className={style.field}>
          <label>Category</label>
          <select>
            <option>Select Category</option>
          </select>
        </div>

        <div className={style.field}>
          <label>Medicine Name</label>
          <input type="text" placeholder="Enter medicine name" />
        </div>
      </div>

      <div className={style.field}>
        <label>Medicine Description</label>
        <textarea rows="4" placeholder="Enter medicine description"></textarea>
      </div>

      <div className={style.row}>
        <div className={style.field}>
          <label>Price</label>
          <input type="number" placeholder="Enter price" />
        </div>

        <div className={style.field}>
          <label>Medicine Image</label>
          <input type="file" />
        </div>
      </div>

      <div className={style.actions}>
        <button className={style.submit}>Add Medicine</button>
        <button type="button" className={style.cancel}>Cancel</button>
      </div>

    </form>
  </div>
</div>

  )
}

export default ProductAdd