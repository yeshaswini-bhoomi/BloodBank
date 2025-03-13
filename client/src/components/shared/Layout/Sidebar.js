import React from 'react'
// import { userMenu } from './Menus/userMenu'
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../../styles/Layout.css';

const Sidebar = () => {
  //GET User State
  const {user} = useSelector(state => state.auth)


    //make a variable so that we can use its features
    const location =useLocation()
    // const isActive = location.pathname;
  return (
    <div>
      <div className='sidebar'>
        <div className='menu'>
          {user?.role === 'organisation' && (
            <>
            <div className={`menu-item ${location.pathname === '/' && 'active'}`}>
            <i className="fa-solid fa-warehouse"></i>
            <Link to="/">Inventory</Link>
          </div>
          <div className={`menu-item ${location.pathname === '/donor' && 'active'}`}>
            <i className="fa-solid fa-hand-holding-medical"></i>
            <Link to="/donor">Donor</Link>
          </div>
          <div className={`menu-item ${location.pathname === '/hospital' && 'active'}`}>
            <i className="fa-solid fa-hospital"></i>
            <Link to="/hospital">Hospital</Link>
          </div>
            </>
          )} 
          {user?.role === 'admin' && (
            <>
            <div className={`menu-item ${location.pathname === '/donor-list' && 'active'}`}>
            <i className="fa-solid fa-hand-holding-medical"></i>
            <Link to="/donor-list">Donor List</Link>
          </div>
          <div className={`menu-item ${location.pathname === '/hospital-list' && 'active'}`}>
            <i className="fa-solid fa-hospital"></i>
            <Link to="/hospital-list">Hospital List</Link>
          </div>
          <div className={`menu-item ${location.pathname === '/organisation-list' && 'active'}`}>
            <i className="fa-solid fa-building"></i>
            <Link to="/organisation-list">Organisation List</Link>
          </div>
            </>
          )}
          {(user?.role === 'donor' || user?.role === 'hospital') && (
            <div className={`menu-item ${location.pathname === '/organisation' && 'active'}`}>
            <i className="fa-solid fa-building"></i>
            <Link to="/organisation">Organisation</Link>
          </div>
          )}
          {user?.role === 'hospital' && (
            <div className={`menu-item ${location.pathname === '/consumer' && 'active'}`}>
            <i className="fa-solid fa-cart-shopping"></i>
            <Link to="/consumer">Consumer</Link>
          </div>
          )}
          {user?.role === 'donor' && (
            <div className={`menu-item ${location.pathname === '/donation' && 'active'}`}>
            <i className="fa-solid fa-droplet"></i>
            <Link to="/donation">Donation</Link>
          </div>
          )} 
            {/* import using map method */}
            {/* import Consumer from './../../../pages/Dashboard/Consumer';
{userMenu.map((menu) => {
                const isActive = location.pathname === menu.path
                return (
                <div className={`menu-item ${isActive && 'active'}`} key={menu.name}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                </div>)
            })} */}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
