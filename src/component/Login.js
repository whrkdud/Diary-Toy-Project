import '../css/login.css';
import axios from 'axios';
import { useState } from 'react';
import Register from './Register';
import FindPw from './FindPw';
import FindId from './FindId';
import { useEffect } from 'react';

function Login() {
    const [register, setRegister] = useState();
    const [findPw, setFindPw] = useState();
    const [findId, setFindId] = useState();

    const loginClick = async() => {
        let id = document.querySelector('#id').value
        let password = document.querySelector('#password').value
        await axios.post('/login',{
            id : id,
            password : password,
        }).then((res)=> {
            if(res.data==="로그인실패"){
                alert(res.data)
            }else{
                const data = res.data[0]
                window.sessionStorage.setItem('id',data.ID)
                window.sessionStorage.setItem('password',data.password)
                window.sessionStorage.setItem('nickname',data.NickName)
                window.sessionStorage.setItem('phonenum',data.phonenum)
                window.sessionStorage.setItem('name',data.name)
                window.location.reload()
            }
        })
    }

    useEffect(()=>{
        document.querySelector('.idInput').addEventListener('focus', ()=>{
            document.querySelector('.idSvg').style.color = '#ccd5ae';
        });
        document.querySelector('.idInput').addEventListener('blur', ()=>{
            document.querySelector('.idSvg').style.color = 'lightgray';
        });
        document.querySelector('.pwInput').addEventListener('focus', ()=>{
            document.querySelector('.pwSvg').style.color = '#ccd5ae';
        });
        document.querySelector('.pwInput').addEventListener('blur', ()=>{
            document.querySelector('.pwSvg').style.color = 'lightgray';
        });
    })

    return(
        <div className='login'>
            <div className='loginWrap'>
                <div className='loginTitle'>
                    <p>diary</p>
                </div>
                <div className='loginInput'>
                    <div className='id'>
                        <div className='idSvg'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                            </svg>
                        </div>
                        <input id='id' className='idInput' type='text' placeholder='아이디'></input>
                    </div>
                    <div className='pw'>
                        <div className='pwSvg'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                            </svg>
                        </div>
                        <input id='password' className='pwInput' type='password' placeholder='비밀번호'></input>
                    </div>
                    <button className='loginBtt' onClick={loginClick}>로그인</button>
                </div>
                <div className='findRegister'>
                    <div className='findId' onClick={()=>setFindId(true)}>
                        <p>아이디 찾기</p>
                    </div>
                    <div className='findPw' onClick={()=>setFindPw(true)}>
                        <p>비밀번호 찾기</p>
                    </div>
                    <div className='register' onClick={()=>setRegister(true)}>
                        <p>회원가입</p>
                    </div>
                </div>
            </div>
            <Register register={register} setRegister={setRegister}></Register>
            <FindPw findPw={findPw} setFindPw={setFindPw}></FindPw>
            <FindId findId={findId} setFindId={setFindId}></FindId>
        </div>
    );
}
export default Login;