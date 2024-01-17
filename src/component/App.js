import '../css/app.css';

import Sidebar from './Sidebar';
import Login from './Login';
import Home from './Home';
import Yearlyplan from './Yearlyplan';
import { useState } from 'react';

function App() {
    const[yearlyplanmodal,setYearlyPlanModal] = useState();

    if(window.sessionStorage.length===0){
        return(
            <div className='app'>
                <Sidebar></Sidebar>
                <Login></Login>
            </div>
        );    
    } else {
        return(
            <div className='app'>
                <Sidebar yearlyplanmodal={yearlyplanmodal} setYearlyPlanModal={setYearlyPlanModal}></Sidebar>
                <Home yearlyplanmodal={yearlyplanmodal}></Home>
                <Yearlyplan yearlyplanmodal={yearlyplanmodal} setYearlyPlanModal={setYearlyPlanModal}></Yearlyplan>
            </div>
        );
    }
    
}
export default App;