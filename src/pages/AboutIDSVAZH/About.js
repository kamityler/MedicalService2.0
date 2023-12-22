import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import events from "./Events";
import "./About.css"

const changeDate = ()=>{
    const el = document.querySelector('#fc-dom-1');
    el.textContent = "Грудень 2023";
    const num = document.querySelector('.fc-today-button');
    num.textContent = "Сьогодні";
    const days = document.querySelectorAll('.fc-col-header-cell-cushion');
    days[0].textContent = 'Нд';
    days[1].textContent = 'Пн';
    days[2].textContent = 'Вт';
    days[3].textContent = 'Ср';
    days[4].textContent = 'Чт';
    days[5].textContent = 'Пт';
    days[6].textContent = 'Сб';
}
function About() {
   
    return (
        <div className="Calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "Попередній,наступний",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            themeSystem="Simplex"
            plugins={[dayGridPlugin]}
            events={events}
          />
         {setTimeout(()=>changeDate(),10)}
        </div>
      );
}


export default About