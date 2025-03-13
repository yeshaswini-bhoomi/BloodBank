import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/API';
import moment from 'moment';

const HospitalList = () => {
    const [data,setData] = useState([])
    //find donor records
    const getDonors = async () => {
        try {
            const {data} = await API.get('/admin/hospital-list')
            // console.log(data)
            if(data?.success){
                setData(data?.hospitalData);
            }
        } catch (error) {
            console.log(error);
        }
    };
    //in useeffect we can execute multiple functions and many dependencies
    useEffect(() => {
        getDonors();
    }, [])

    //Delete Function
    const handleDelete = async(id) => {
        try {
            let answer = window.prompt('Are you sure you want to delete this Hospital', 'Sure')
            if(!answer) return
            const {data} = await API.delete(`/admin/delete-donor/${id}`)
            alert(data?.message)
            window.location.reload(); //reload the page
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
        <table className="table container">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Time & Date</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.hospitalName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                <button className='btn btn-danger' onClick={() => handleDelete(record._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
    </Layout>
  )
}

export default HospitalList
