import '../css/home.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { useEffect, useState } from 'react';
import AddSchedule from './AddSchedule';
import axios from 'axios';


function Home(props) {
    const [addSchedule, setAddSchedule] = useState();
    const [readSchedule, setReadSchedule] = useState();
    const [deleteSchedule, setDeleteSchedule] = useState();

    useEffect(()=>{
        document.querySelector('.fc-addScheduleBtt-button').addEventListener('click', ()=>{
            setAddSchedule(true);
        });
    })

    useEffect(()=>{readEvent()},[addSchedule,deleteSchedule,props.yearlyplanmodal])

    const readEvent = ()=>{
        let id = window.sessionStorage.id
        axios.post('/home', {
            id : id
        }).then((res) => {
            setReadSchedule(res.data)
        })
    }

    const deleteEvent = (seq) => {
        let id = window.sessionStorage.id
        axios.post('/deleteEvent',{
            id : id,
            seq : seq
        }).then((res) => {
            window.alert(res.data)
            if(deleteSchedule==="1"){
                setDeleteSchedule("2")
            }else{
                setDeleteSchedule("1")
            }
        })
    }

    return(
        <div className='homeWrap'>
            <div className='home'>
                <div className='homeCalendar'>
                    <FullCalendar
                    plugins={[dayGridPlugin, googleCalendarPlugin]}
                    googleCalendarApiKey='AIzaSyAFzzD7XHJFqO3PNDSIKbzwq9BDQM1JSbU'
                    initialView="dayGridMonth"
                    dayMaxEvents={true}
                    eventSources={[
                        {
                            googleCalendarId:'ko.south_korea#holiday@group.v.calendar.google.com',
                            textColor:'#606c38',
                            backgroundColor:'transparent',
                            borderColor:'transparent',
                        }
                    ]}
                    events={readSchedule}
                    eventClick={(event) => {
                        event.jsEvent.preventDefault();
                        let seq = event.el.fcSeg.eventRange.def.extendedProps.seq
                        if(window.confirm("삭제하시겠습니까?")){
                        deleteEvent(seq)
                        }
                    }}
                    eventOrderStrict={true}
                    editable={true}
                    customButtons={
                        {
                            addScheduleBtt:{text:'+schedule'}
                        }
                    }
                    headerToolbar={
                        {
                            start:'addScheduleBtt',
                            center:'title',
                            end:'today,prev,next'
                        }
                    }
                    />
                </div>
            </div>
            <AddSchedule addSchedule={addSchedule} setAddSchedule={setAddSchedule}></AddSchedule>
        </div>
    );
}
export default Home;