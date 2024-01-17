import ReactModal from 'react-modal';
import '../css/addSchedule.css'
import axios from 'axios';

function AddSchedule(props) {
    const addScheduleModalStyle = {
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
            width: '400px',
            height: '200px',
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

    const addSchedule = ()=>{
        let id = window.sessionStorage.id
        let date = document.querySelector('.addScheduleInputDate').value
        let sort = document.querySelector('.addScheduleInputSelect').value
        let title = document.querySelector('textarea').value
        let color = ""

        if(sort==='schedule') {
            title='# '+title
        } else if(sort==='todo') {
            title='! '+title
        } else {
            title='· '+title
        }

        if(sort==="schedule"){
            color=color+"#ffadad"
        }else if (sort ==="todo"){
            color=color+"#ff9770"
        }else{
            color=color+"#34a0a4"
        }

        if(sort==='none' || date==='' || title==='') {
            alert('항목을 확인해주세요.')
        } else {
            axios.post('/addSchedule', {
                id : id,
                date : date,
                sort : sort,
                title : title,
                color : color
            })
            alert('저장되었습니다.')
            props.setAddSchedule(false)
            window.location.reload()
        }

    }

    return(
        <ReactModal isOpen={props.addSchedule} ariaHideApp={false} style={addScheduleModalStyle}>
            <div className='addScheduleWrap'>
                <div className='addScheduleX'>
                    <p onClick={()=>{props.setAddSchedule(false);}}>&#215;</p>
                </div>
                <div className='addScheduleInputWrap'>
                    <div className='addScheduleInputDateSelect'>
                        <input className='addScheduleInputDate' type='date'></input>
                        <select className='addScheduleInputSelect' required='required'>
                            <option value={'none'} selected disabled hidden>분류 선택</option>
                            <option value={'schedule'}># 일정</option>
                            <option value={'todo'}>! 할 일</option>
                            <option value={'memo'}>&#183; 메모</option>
                        </select>
                    </div>
                    <div className='addScheduleInputTextarea'>
                        <textarea></textarea>
                    </div>
                    <div className='addScheduleInputButton'>
                        <button onClick={()=>{addSchedule()}}>등록</button>
                    </div>
                </div>
            </div>
        </ReactModal>
    )
}
export default AddSchedule;