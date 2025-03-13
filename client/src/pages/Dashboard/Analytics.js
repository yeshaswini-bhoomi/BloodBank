import React,{useState,useEffect} from 'react'
import Header from '../../components/shared/Layout/Header'
import API from '../../services/API'
import moment from 'moment';

const Analytics = () => {
    const [data, setData] = useState([]);
    const [inventoryData, setInventoryData] = useState([]);
    const colors = ["#5F6F52","#A9B388","#FA7070","#B99470","#F7B787","#D0F288","#9BB8CD","#F3FDE8"];

    //GET blood group data
    const getBloodGroupData = async() => {
        try {
            const {data} = await API.get('/analytics/bloodGroups-data');
            if(data?.success){
                setData(data?.bloodGroupData);
                // console.log(data);
            }

        } catch (error) {
            console.log(error);
        }
    };
    //lifecycle method
    useEffect(() => {
        getBloodGroupData();},[]);
    
    //GET function
  const getBloodRecords = async() =>{
    try {
      const {data} = await API.get('/inventory/get-recent-inventory');
      if(data?.success){
        setInventoryData(data?.inventory);
        // console.log(data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <>
        <Header/>
        {/* use flex wrap to make responsive */}
        <div className='d-flex flex-row flex-wrap'>
            {data?.map((record,i) => (
            <div className="card m-4 p-1" key={i} style={{width: '18rem', backgroundColor: `${colors[i]}`}}>
                <div className="card-body">
                    <h1 className="card-title bg-light text-dark text-center mb-3">{record.bloodGroup}</h1>
                    <p className="card-text">Total In: <b>{record.totalIn}</b>(ml)</p>
                    <p className="card-text">Total Out: <b>{record.totalOut}</b>(ml)</p>
                </div>
                <div className='card-footer bg-dark text-light text-center'>
                    Total Available: <b>{record.availableBlood}</b>
                </div>
            </div>
            ))}
        </div>
        <div className='container my-3'>
            <h1 className='my-3'>Recent Blood Transactions</h1>
        <table className="table container">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Donor Email</th>
              <th scope="col">Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map(record => (
              <tr key ={record._id}>
              <td>{record.bloodGroup}</td>
              <td>{record.inventoryType}</td>
              <td>{record.quantity} (ml)</td>
              <td>{record.email}</td>
              <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
            </tr> 
            ))}
          </tbody>
        </table>
        </div>
    </>
  );
};

export default Analytics
