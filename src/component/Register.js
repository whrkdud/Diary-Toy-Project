import '../css/register.css';
import axios from 'axios';
import ReactModal from 'react-modal';


function Register(props) {

    //아이디 중복확인 , 사용가능한 아이디 인지 확인
    const idCheck = async() => {
        let checkid = document.querySelector('.registerId').value
        await axios.post('/registercheck',{
            id : checkid,
        }).then((res) => {
            if(res.data ==="possible"){
                if(checkEngNum()){
                    if (checkid ===""){
                        alert("아이디를 입력해주세요.")
                    }else{
                        alert("사용가능한 ID입니다.")
                    }
                }else{
                    alert("영문+숫자로 입력해주세요.")
                }
            }else{
                alert("중복된 아이디입니다.")
            }
        })
    }

    //아이디에 한글 포함되어있는지 확인하는 함수
    const checkEngNum = () => {
        const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g; 
        if(regExp.test(document.querySelector('.registerId').value)){
            return false;
        }else{
            return true;
        }
    }

    //핸드폰번호 숫자만 있는지 체크
    const phonenumCheck = () => {
        if(Number.isInteger((Number(document.querySelector('.registerPhone').value)))){
            document.querySelector('.registerAlertNumber').style.display = 'none'
            return true;
        }else{
            return false;
        }
    }
    
    //핸드폰번호 길이 체크
    const phonelengthCheck = () => {
        if(document.querySelector('.registerPhone').value.length === 11){
            document.querySelector('.registerAlertLength').style.display = 'none'
            return true;
        }else{
            return false;
        }
    }

    //회원가입
    const registerId = async() => {
        let id = document.querySelector('.registerId').value
        let password = document.querySelector('.registerPw').value
        let name = document.querySelector('.registerName').value
        let nickname = document.querySelector('.registerNickname').value
        let phonenum = document.querySelector('.registerPhone').value
        if(checkEngNum()){
            if(phonenumCheck()){
                if(phonelengthCheck()){
                    await axios.post('/register',{
                        id : id,
                        password : password,
                        name : name,
                        nickname : nickname,
                        phonenum : phonenum,
                    }).then((res) => {
                        if(res.data === "again"){
                            document.querySelector('.registerNull').style.display = "block"
                        }else {
                            document.querySelector('.registerNull').style.display = "none"
                            if(res.data === "fail"){
                                alert("중복된 아이디입니다.")                                
                            }else{
                                alert("가입이 완료되었습니다. 로그인해주세요.");
                                props.setRegister(false);
                            }
                        }
                    })
                }else{
                    document.querySelector('.registerAlertLength').style.display = 'block'
                }
            }else{
                document.querySelector('.registerAlertNumber').style.display = 'block'
            }
        }else{
            alert("아이디를 영문+숫자로 입력해주세요.")                
        }
    }
        
    const registerModalStyle = {
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
        <ReactModal isOpen={props.register} ariaHideApp={false} style={registerModalStyle}>
            <div className='registerWrap'>
                <div className='registerX'>
                    <p onClick={()=>props.setRegister(false)}>&#215;</p>
                </div>
                <div className='registerTitle'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                    <p>회원가입</p>
                </div>
                <div className='registerInput'>
                    <div className='registerIdWrap'>
                        <input className='registerId' type='text' placeholder='아이디'></input>
                        <button className='registerIdCheck' onClick={()=>{idCheck()}}>중복확인</button>
                    </div>
                    <input className='registerPw' type='password' placeholder='비밀번호'></input>
                    <input className='registerName' type='text' placeholder='이름'></input>
                    <input className='registerNickname' type='text' placeholder='별명'></input>
                    <input className='registerPhone' type='text' placeholder='휴대전화(ex.01012345678)'></input>
                    <div className='registerAlertLength'>휴대전화를 확인해주세요. &#40;ex.01012345678&#41;</div>
                    <div className='registerAlertNumber'>숫자만입력해주세요. &#40;ex.01012345678&#41;</div>
                    <div className='registerNull'>정보를 입력해주세요.</div>
                    <button className='registerSuccess' onClick={()=>{registerId();}}>가입하기</button>
                </div>
            </div>
        </ReactModal>
    );
}
export default Register;