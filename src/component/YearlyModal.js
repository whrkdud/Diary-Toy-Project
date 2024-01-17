import ReactModal from "react-modal";
import CustomEditor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";
import axios from "axios";

function YearlyModal (props) {
    const[data,setData] = useState("");

    const yearlyModalStyle = {
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

    const saveyearlyplan = () =>{
        axios.post('/saveYearlyPlan',{
            id : window.sessionStorage.id,
            year : 2024,
            content : data
        }).then(
            alert("저장이 완료되었습니다."),
            props.SetYearlyModal(false)
        )
    }

    return(
        <ReactModal isOpen={props.yearlymodal} ariaHideApp={false} style={yearlyModalStyle}>
            <div className="yearlyModalX">
                <p onClick={()=>{props.SetYearlyModal(false);}}>&#215;</p>
            </div>
            <CKEditor
                editor={CustomEditor}
                config={{
                    placeholder:"내용을 입력하세요."
                }}
                onChange={(event,editor)=>{
                    setData(editor.getData())
                }}
            >
            </CKEditor>
            <button type='button' onClick={()=>{saveyearlyplan()}}>글 저장</button>
        </ReactModal>
    )
}
export default YearlyModal