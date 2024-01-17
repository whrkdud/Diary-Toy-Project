import ReactModal from 'react-modal';
import '../css/findId.css';
import { useState } from 'react';
import axios from 'axios';

function FindId(props) {
    const [mode, setMode] = useState('1');
    const findIdDiv = [];

    const findId = async() =>{
        let name = document.querySelector('.findIdName').value
        let phonenum = document.querySelector('.findIdPhone').value
        await axios.post('/findId', {
            name : name,
            phonenum : phonenum,
        }).then((res)=> {
            if(res.data==="정보없음"){
                alert(res.data)
            }else{
                setMode('2');
                setTimeout(()=>{
                    const idresult = res.data[0].ID.substring(0,3) + "*".repeat(res.data[0].ID.length -3)
                    document.querySelector('.findIdFinishText1-2').innerHTML = `<div>${idresult}</div>`},100)
            }
        })
    }

    if(mode==='1') {
        findIdDiv.push(
            <div className='findIdWrap'>
                <div className='findIdX'>
                    <p onClick={()=>props.setFindId(false)}>&#215;</p>
                </div>
                <div className='findIdTitle'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    <p>아이디 찾기</p>
                </div>
                <div className='findIdInput'>
                    <input className='findIdName' type='text' placeholder='이름'></input>
                    <input className='findIdPhone' type='text' placeholder='휴대전화(ex.01012345678)'></input>
                    <button className='findIdNext' onClick={()=>{findId();}}>확인</button>
                </div>
            </div>
        )
    } else {
        findIdDiv.push(
            <div className='findIdWrap'>
                <div className='findIdX'>
                    <p onClick={()=>{props.setFindId(false); setMode('1');}}>&#215;</p>
                </div>
                <div className='findIdTitle'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    <p>아이디 찾기</p>
                </div>
                <div className='findIdFinish'>
                    <div className='findIdFinishText'>
                        <div className='findIdFinishText1'>
                            <p className='findIdFinishText1-1'>" 회원님의 아이디는&nbsp;</p>
                            <p className='findIdFinishText1-2'>&nbsp;</p>
                            <p className='findIdFinishText1-3'>입니다.</p>
                        </div>
                        <p className='findIdFinishText2'>로그인해주세요. "</p>
                    </div>
                    <button className='findIdSuccess' onClick={()=>{props.setFindId(false); setMode('1');}}>완료</button>
                </div>
            </div>
        )
    }

    const findIdModalStyle = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
            position: 'absolute',
            width: '400px',
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
            padding: '0.5%'
        },
    };

    return(
        <ReactModal isOpen={props.findId} ariaHideApp={false} style={findIdModalStyle}>
            {findIdDiv}
        </ReactModal>
    );
}
export default FindId;