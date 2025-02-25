import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/API';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Organisation = () => {
    //get current user
    const {user} = useSelector(state => state.auth)   //auth is reducer
    const [data,setData] = useState([])
    //find organisation records
    const getOrg = async () => {
        try {
            if(user?.role === 'donor'){
                const {data} = await API.get('/inventory/get-organisations')
            // console.log(data)
            if(data?.success){
                setData(data?.organisations);
            }
        }
        if(user?.role === 'hospital'){
            const {data} = await API.get('/inventory/get-organisations-for-hospitals')
        // console.log(data)
        if(data?.success){
            setData(data?.organisations);
        }
    }
    } catch (error) {
            console.log(error);
        }
    };
    //in useeffect we can execute multiple functions and many dependencies
    useEffect(() => {
        getOrg();
    }, [user])
  return (
    <Layout>
        <table className="table container">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Time & Date</th>
            </tr>
          </thead>
          <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.organisationName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.address}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
            </tr>
          ))}
        </tbody>
        </table>
    </Layout>
  )
}

export default Organisation
