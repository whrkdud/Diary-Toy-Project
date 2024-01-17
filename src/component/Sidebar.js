import { useEffect } from 'react';
import '../css/sidebar.css';
import profileImg from '../img/profileImg.jpg';
import axios from 'axios';
import { useState } from 'react';

function Sidebar(props) {
    const [reader,SetReader] = useState();

    useEffect(()=>{
        if(window.sessionStorage.length===0) {
            document.querySelector('.sidebar').style.filter = 'blur(3px)';
        } else {
            document.querySelector('.sidebar').style.filter = 'blur(0)';
            document.querySelector('.sidebarSecret').style.display = 'none';
        }
    })

    useEffect(()=>{readyearlyplan()},[props.yearlyplanmodal])

    const readyearlyplan = () => {
        let id = window.sessionStorage.id
        axios.post('/readyearlyplan',{
            id : id
        }).then((res)=>{
            SetReader(res.data)
        })
    }

    const logout = ()=>{
        window.sessionStorage.clear();
        window.location.reload();
    };

    return(
        <div className='sidebarWrap'>
            <div className='sidebarSecret'>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-house-lock-fill" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                    <path d="m8 3.293 4.72 4.72a3 3 0 0 0-2.709 3.248A2 2 0 0 0 9 13v2H3.5A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
                    <path d="M13 9a2 2 0 0 0-2 2v1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1v-1a2 2 0 0 0-2-2Zm0 1a1 1 0 0 1 1 1v1h-2v-1a1 1 0 0 1 1-1Z"/>
                </svg>
            </div>
            <div className='sidebar'>
                <div className='diaryTitle'>
                    <p>diary</p>
                </div>
                <div className='profileWrap'>
                    <div className='profile'>
                        <div className='profileImg'>
                            <img src={profileImg}></img>
                        </div>
                    </div>
                    <div className='userWrap'>
                        <p><strong>{window.sessionStorage.nickname} </strong>님, 오늘도 화이팅!</p>
                        <div className='logout' onClick={logout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                            </svg>
                            <p>로그아웃</p>
                        </div>
                    </div>
                </div>
                <div className='yearlyPlanWrap'>
                    <div className='yearlyPlan'>
                        <div className='yearlyPlanTitle'>
                            <p onClick={()=>{props.setYearlyPlanModal(true)}} title="'yearly plan' 전체보기">yearly plan</p>
                        </div>
                        <div className='yearlyPlanContent'>
                            {reader && reader.map((lst)=>(
                                <ul key={lst.seq}>
                                    <div dangerouslySetInnerHTML={{__html:lst.content}}></div>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
export default Sidebar;