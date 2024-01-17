import { useState } from 'react';
import '../css/findPw.css';
import ReactModal from 'react-modal';
import axios from 'axios';

function FindPw(props) {
    const [saveid, setSaveId] = useState('');
    const [mode, setMode] = useState('1');
    const findPwDiv = [];

    const findPw = async() =>{
        let id = document.querySelector('.findPwId').value
        let name = document.querySelector('.findPwName').value
        let phonenum = document.querySelector('.findPwPhone').value
        await axios.post('/findPw', {
            id : id,
            name : name,
            phonenum : phonenum,
        }).then((res)=> {
            if(res.data==="정보없음"){
                alert(res.data)
            }else{
                setSaveId(document.querySelector('.findPwId').value)
                document.querySelector('.findPwId').value = ""
                document.querySelector('.findPwName').value = ""
                document.querySelector('.findPwPhone').value = ""
                setMode('2');
            }
        })
    }

    const updatePw = async() => {
        const newpw = document.querySelector('.findPwNewPw').value
        const checkpw = document.querySelector('.findPwNewPwCheck').value
        if(newpw === checkpw){
            await axios.post('/updatePW', {
                id : saveid,
                newpassword : newpw,
            }).then(
                alert("변경완료 되었습니다."),
                props.setFindPw(false),
                setMode('1')
            )
        }else{
            alert("비밀번호를 다시 입력해주세요.")
        }
    }

    if(mode==='1') {
        findPwDiv.push(
            <div className='findPwWrap'>
                <div className='findPwX'>
                    <p onClick={()=>props.setFindPw(false)}>&#215;</p>
                </div>
                <div className='findPwTitle'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    <p>비밀번호 찾기</p>
                </div>
                <div className='findPwProcess'>
                    <div className='findPwProcess1' style={{'fontWeight':'bold'}}>01. 본인확인</div>
                    <div className='findPwProcess2'>&nbsp;&gt;&nbsp;</div>
                    <div className='findPwProcess3'>02. 비밀번호 재설정</div>
                </div>
                <div className='findPwInput'>
                    <input className='findPwId' type='text' placeholder='아이디'></input>
                    <input className='findPwName' type='text' placeholder='이름'></input>
                    <input className='findPwPhone' type='text' placeholder='휴대전화(ex.01012345678)'></input>
                    <button className='findPwNext' onClick={()=>{findPw();}}>다음</button>
                </div>
            </div>
        )
    } else {
        findPwDiv.push(
            <div className='findPwWrap'>
                <div className='findPwX'>
                    <p onClick={()=>{setMode('1'); props.setFindPw(false)}}>&#215;</p>
                </div>
                <div className='findPwTitle'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    <p>비밀번호 찾기</p>
                </div>
                <div className='findPwProcess'>
                    <div className='findPwProcess1'>01. 본인확인</div>
                    <div className='findPwProcess2'>&nbsp;&gt;&nbsp;</div>
                    <div className='findPwProcess3' style={{'fontWeight':'bold'}}>02. 비밀번호 재설정</div>
                </div>
                <div className='findPwInput'>
                    <input className='findPwNewPw' type='password' placeholder='새 비밀번호'></input>
                    <input className='findPwNewPwCheck' type='password' placeholder='비밀번호 확인'></input>
                    <button className='findPwSuccess' onClick={()=>{updatePw();}}>완료</button>
                </div>
            </div>
        )
    }

    const findPwModalStyle = {
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
        <ReactModal isOpen={props.findPw} ariaHideApp={false} style={findPwModalStyle}>
            {findPwDiv}
        </ReactModal>
    );
}
export default FindPw;