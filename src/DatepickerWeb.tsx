import { ReactElement, createElement, useState, useCallback, useEffect } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, Day, DayValue } from "react-modern-calendar-datepicker";
import { DatepickerWebContainerProps } from "../typings/DatepickerWebProps";
import { ValueStatus } from "mendix";

import "./ui/DatepickerWeb.css";

export function DatepickerWeb({
    name,
    displayContent,
    attribute,
    minimumDateAttribute,
    maximumDateAttribute,
    colorPrimary,
    calendarClassName,
    calendarTodayClassName,
    calendarSelectedDayClassName
}: DatepickerWebContainerProps): ReactElement {

    //Check if all attributes are loaded
    if ((attribute && attribute.status === ValueStatus.Loading) || (minimumDateAttribute && minimumDateAttribute.status === ValueStatus.Loading) || (maximumDateAttribute && maximumDateAttribute.status === ValueStatus.Loading)) return (<div />);

    // Today's date
    const today = new Date;

    //State for selected date
    const [selectedDay, setSelectedDay] = useState<DayValue>(
        attribute.value ?
            {
                year: attribute.value?.getFullYear(),
                month: attribute.value?.getMonth() + 1,
                day: attribute.value?.getDate()
            } :
            {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                day: today.getDate()
            }
    )

    const [showCalendar, setShowCalendar] = useState<Boolean>(false);
    
    // Set minimum date
    var minimumDate: Day; 
    if(minimumDateAttribute?.value){
        minimumDate = {year: minimumDateAttribute.value?.getFullYear(), month: minimumDateAttribute.value?.getMonth() + 1, day: minimumDateAttribute.value?.getDate()}
    }
    else{
        const minDate = new Date(1900,1,1);
        minimumDate = {year: minDate.getFullYear(), month: minDate.getMonth() + 1, day: minDate.getDate()}
    }

    // Set maximum date
    var maximumDate: Day;
    if(maximumDateAttribute?.value){
        maximumDate = {year: maximumDateAttribute.value?.getFullYear(), month: maximumDateAttribute.value?.getMonth() + 1, day: maximumDateAttribute.value?.getDate()}
    }
    else{
        const maxDate = new Date(3000,11,31);
        maximumDate = {year: maxDate.getFullYear(), month: maxDate.getMonth() + 1, day: maxDate.getDate()}
    }

    // Update attribute and widget on date save
    const onDateChange = useCallback((newDate: DayValue) => {
        if (newDate) {
            setSelectedDay({
                year: newDate.year,
                month: newDate.month,
                day: newDate.day
            })
            attribute.setValue(new Date(newDate.year, (newDate.month-1), newDate.day));
            setShowCalendar(false);
        }
    }, [setSelectedDay, setShowCalendar])

    //Function to detect click outside the widget
    useEffect(() => {
        document.addEventListener('mouseup', function (e: any) {
                var outer = document.getElementById(name+"-calendar");
                if(!(outer?.contains(e.target))) {
                    setShowCalendar(false);
                }
        })
    }, [])

    //Render the calendar if showCalendar is true
    const renderCalendar = useCallback(() => {
        if (showCalendar) {
            return (
                <div id={name+"-calendar"} className="calendarOuterDiv">
                    <Calendar
                        value={selectedDay}
                        onChange={(newvalue: DayValue) => onDateChange(newvalue)}
                        minimumDate={minimumDate}
                        maximumDate={maximumDate}
                        colorPrimary={colorPrimary?.value}
                        calendarClassName={calendarClassName?.value}
                        calendarTodayClassName={calendarTodayClassName?.value}
                        calendarSelectedDayClassName={calendarSelectedDayClassName?.value}
                    />
                </div>
            )
        }
        else {
            return (<div />)
        }
    }, [showCalendar, onDateChange])

    //Return the widget components
    return (
        <div>
            <div onClick={() => setShowCalendar(true)} className="datePickerContent">{displayContent}</div>
            {renderCalendar()}
        </div>
    );
}
