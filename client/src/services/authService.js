//this is not a react component so we use store to dispatch
import { userLogin,userRegister } from '../redux/features/auth/authAction';
import store from '../redux/store';

//reusable function
export const handleLogin = (e, email, password, role) => {
    e.preventDefault()
    try {
        if(!role || !email || !password){
            return alert('Please provide all fields');
        }
        store.dispatch(userLogin({ email, password, role }));
    } catch (error) {
        console.log(error)
    }
};

export const handleRegister = (e,name,role,email,password,organisationName,hospitalName,website,address,phone) => {
    e.preventDefault()
    try {
        store.dispatch(userRegister({name,role,email,password,organisationName,hospitalName,website,address,phone}));
    } catch (error) {
        console.log(error)
    }
};