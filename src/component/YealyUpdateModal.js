import ReactModal from "react-modal";
import CustomEditor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";
import axios from "axios";

function YearlyUpdateModal (props) {
    const[data,setData] = useState("");

    const yearlyUpdateModalStyle = {
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

    const updateyearlyplan = () => {
        axios.put('/updateYearlyPlan',{
            seq : props.updatemodal[1],
            id : window.sessionStorage.id,
            content : data
        })
        window.alert("수정이 완료되었습니다.")
        setData("")
        props.SetOpenUpdateModal(false)
    }

    const check = () => {
        alert("수정해주세요")
        setData("")
    } 


    return(
        <ReactModal isOpen={props.openupdatemodal} ariaHideApp={false} style={yearlyUpdateModalStyle}>
            <div className="yearlyModalX">
                <p onClick={()=>{props.SetOpenUpdateModal(false);}}>&#215;</p>
            </div>
            <CKEditor
                editor={CustomEditor}
                data={props.updatemodal[0]}
                onChange={(event,editor)=>{                   
                    setData(editor.getData())
                }}
            >
            </CKEditor>
            <button type='button' onClick={()=>{data==="" ? check() : updateyearlyplan()}}>수정</button>
        </ReactModal>
    )
}
export default YearlyUpdateModal