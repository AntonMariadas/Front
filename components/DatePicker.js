import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const DatePicker = ({ setSelectedDate }) => {
    const [date, setDate] = useState(new Date());
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div>
            <div className='calendar-container'>
                <Calendar
                    onChange={setDate}
                    value={date}
                    maxDate={new Date()}
                />
            </div>
            <p className='text-center text-primary fw-bold'>
                {date.toLocaleDateString("fr-FR", options)}
                <button className='btn btn-primary btn-sm mx-3' onClick={() => setSelectedDate(date)}>OK</button>
            </p>
        </div>
    );
};

export default DatePicker;