import axios from 'axios';
import { useState } from 'react';

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
})

const toDecimal = (number: any) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2, // Ensures at least two decimal places
    maximumFractionDigits: 2, // Limits to two decimal places
  });
  // Format the number
  return formatter.format(number);
};


export default function Prodsearch() {
  const [prodsearch, setProdsearch] = useState<[]>([]);
  const [message, setMessage] = useState<string>('');
  let [searchkey, setSearchkey] = useState<string>('');

  const getProdsearch = async (event: any) => {
      event.preventDefault();
      setMessage("please wait .");

      api.get(`/api/productsearch/${searchkey}`)
      .then((res: any) => {
          setProdsearch(res.data);
      }, (error: any) => {
        setMessage(error.response.data.messages.error);
        setProdsearch([]);
        setTimeout(() => {
            setMessage('');
        }, 3000);
          return;
      });  
      setMessage('');
  }
   
return (
  <div className="container mb-10">
      <h2 className='text-warning embossed mt-3'>Products Search</h2>

      <form className="row g-3" onSubmit={getProdsearch} autoComplete='off'>
          <div className="col-auto">
            <input type="text" required className="form-control-sm" value={searchkey} onChange={e => setSearchkey(e.target.value)} placeholder="enter Product keyword"/>
            <div className='searcMsg text-warning'>{message}</div>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary btn-sm mb-3">search</button>
          </div>

      </form>
      <div className="container mb-9">
        <div className="card-group">
      {prodsearch.map((item) => {
              return (
              <div className='col-md-4'>
              <div key={item['id']} className="card mx-3 mt-3">
                  <img src={item['productpicture']} className="card-img-top product-size" alt=""/>
                  <div className="card-body">
                    <h5 className="card-title">Descriptions</h5>
                    <p className="card-text desc-h">{item['descriptions']}</p>
                  </div>
                  <div className="card-footer">
                    <p className="card-text text-danger"><span className="text-dark">PRICE :</span>&nbsp;<strong>&#8369;{toDecimal(item['sellprice'])}</strong></p>
                  </div>  
              </div>
              
              </div>
        );    
      })}
        </div>          
        <br/><br/><br/>
      </div>
  </div>  
  )
}
