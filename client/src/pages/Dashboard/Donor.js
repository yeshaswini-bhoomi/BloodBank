//To show the no of donors and which blood they have donated and with the help of useffect we will show it
import React, {useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/API'
import moment from 'moment'

const Donor = () => {
    const [data,setData] = useState([])
    //find donor records
    const getDonors = async () => {
        try {
            const {data} = await API.get('/inventory/get-donors')
            // console.log(data)
            if(data?.success){
                setData(data?.donors);
            }
        } catch (error) {
            console.log(error);
        }
    };
    //in useeffect we can execute multiple functions and many dependencies
    useEffect(() => {
        getDonors();
    }, [])
  return (
    <Layout>
        <table className="table container">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Time & Date</th>
            </tr>
          </thead>
          <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.name || record.organisationName + " (ORG)"}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
            </tr>
          ))}
        </tbody>
        </table>
    </Layout>
  )
}

export default Donor
