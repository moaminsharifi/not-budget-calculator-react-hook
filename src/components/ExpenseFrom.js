import React  from "react"
import {MdSend} from "react-icons/all";

const  ExpenseFrom = ({charge, handleCharge, amount, handleAmount, handleSubmit, edit}) =>{
    return (
        <div>
          <form onSubmit={handleSubmit}>
              <div className="form-center">
                <div className="form-group">
                    <label htmlFor="expense">charge</label>
                    <input type="text"
                           className="form-control"
                           id="charge"
                           name="charge"
                           placeholder="e.g. rent"
                           value={charge}
                           onChange={handleCharge}
                    />
                </div>

                  <div className="form-group">
                      <label htmlFor="amount">amount</label>
                      <input type="text"
                             className="form-control"
                             id="amount"
                             name="number"
                             placeholder="e.g. 1200 $"
                             value={amount}
                             onChange={handleAmount}
                      />
                  </div>

              </div>
              <button type="submit"  className="btn ">
                  {edit? 'edit' :'submit'}
                  <MdSend className="btn-icon" />

              </button>
          </form>

        </div>
    )

}
export default ExpenseFrom