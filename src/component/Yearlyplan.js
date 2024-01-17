import '../css/yearlyplan.css'
import { useEffect, useState } from "react"
import axios from "axios";
import YearlyModal from './YearlyModal';
import YearlyUpdateModal from './YealyUpdateModal';
import ReactModal from 'react-modal';

function Yearlyplan(props) {
    const[showdata,setShowData] = useState([])
    const[yearlymodal,SetYearlyModal] = useState(false);
    const[updatemodal,SetUpdateModal] = useState([,]);
    const[openupdatemodal,SetOpenUpdateModal] = useState()
    const[deletedata,setDeleteData] = useState()
    useEffect(()=>{showyearlyplan()},[yearlymodal])
    useEffect(()=>{showyearlyplan()},[openupdatemodal])
    useEffect(()=>{showyearlyplan()},[deletedata])

    const yearlyplanModalStyle = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '10'
        },
        content: {
            position: 'absolute',
            width: '500px',
            height: '600px',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '3px',
            outline: 'none',
            padding: '0.5%',
            zIndex: '15'
        },
    };

    const showyearlyplan = () => {
        axios.post('/showYearlyPlan',{
            id : window.sessionStorage.id
        }).then((res)=>{
            setShowData(res.data);
        })
    }

    const deleteyearlyplan = (seq) => {
        if(window.confirm("삭제하시겠습니까?")){
            axios.delete('/deleteYearlyPlan',{
                data: {
                    id : window.sessionStorage.id,
                    seq : seq
                }
            })
            window.alert("삭제되었습니다.")
            if(deletedata==="1"){
                setDeleteData("2")
            }else{
                setDeleteData("1")
            }
        }
        
    }
    
    const showlist = () => {
        if(document.querySelector(".yearlyContents").style.display==="block"){
            document.querySelector(".yearlyContents").style.display = "none"
        } else{
            document.querySelector(".yearlyContents").style.display = "block"
        }
    }


    return(
        <ReactModal isOpen={props.yearlyplanmodal} style={yearlyplanModalStyle} ariaHideApp={false}>
            <div>
                <YearlyModal yearlymodal={yearlymodal} SetYearlyModal={SetYearlyModal}/>
                    <div className='yearlyModalX'>
                        <p onClick={()=>{props.setYearlyPlanModal(false);}}>&#215;</p>
                    </div>
                    <div className='yearlyTitle'>
                        <h1>Yearly Plan</h1>
                    </div>
                    <div className='yearlyButton'>
                        <button onClick={()=>{SetYearlyModal(true)}}>글쓰기</button>
                    </div>
                    <div className='yearlyList'>
                        <div className='yearlyYear'>
                            <p>2024</p>
                            <svg onClick={showlist} style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                            </svg>
                        </div>
                        <div className='yearlyContents'>
                        {showdata.map((lst)=>(
                            <ul key={lst.seq} className={'contentlist'}>
                                <div dangerouslySetInnerHTML={{__html:lst.content}}></div>
                                <div>
                                    <button type='button' onClick={()=>{SetUpdateModal([lst.content,lst.seq]);SetOpenUpdateModal(true)}}>수정</button>
                                    <button type='button' onClick={()=>{deleteyearlyplan(lst.seq)}} >삭제</button>
                                </div>
                            </ul>
                        ))}
                        </div>
                    </div>
            </div>
            <YearlyUpdateModal updatemodal={updatemodal} SetUpdateModal={SetUpdateModal} openupdatemodal={openupdatemodal} SetOpenUpdateModal={SetOpenUpdateModal}/>
        </ReactModal>
    )
}
export default Yearlyplan