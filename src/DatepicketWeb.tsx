import { ReactElement, createElement, useState, useCallback, useEffect } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, Day, DayValue } from "react-modern-calendar-datepicker";
import { DatepicketWebContainerProps } from "../typings/DatepicketWebProps";
import { ValueStatus } from "mendix";

import "./ui/DatepicketWeb.css";

export function DatepicketWeb({
    name,
    displayContent,
    attribute,
    minimumDateAttribute,
    maximumDateAttribute,
    colorPrimary,
    calendarClassName,
    calendarTodayClassName,
    calendarSelectedDayClassName
}: DatepicketWebContainerProps): ReactElement {

    //Check if 
    if ((attribute && attribute.status === ValueStatus.Loading) || (minimumDateAttribute && minimumDateAttribute.status === ValueStatus.Loading) || (maximumDateAttribute && maximumDateAttribute.status === ValueStatus.Loading)) return (<div />);

    const today = new Date;

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
    
    var minimumDate: Day; 
    if(minimumDateAttribute?.value){
        minimumDate = {year: minimumDateAttribute.value?.getFullYear(), month: minimumDateAttribute.value?.getMonth() + 1, day: minimumDateAttribute.value?.getDate()}
    }
    else{
        const minDate = new Date(1900,1,1);
        minimumDate = {year: minDate.getFullYear(), month: minDate.getMonth() + 1, day: minDate.getDate()}
    }

    var maximumDate: Day;
    if(maximumDateAttribute?.value){
        maximumDate = {year: maximumDateAttribute.value?.getFullYear(), month: maximumDateAttribute.value?.getMonth() + 1, day: maximumDateAttribute.value?.getDate()}
    }
    else{
        const maxDate = new Date(3000,11,31);
        maximumDate = {year: maxDate.getFullYear(), month: maxDate.getMonth() + 1, day: maxDate.getDate()}
    }

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

    return (
        <div>
            <div onClick={() => setShowCalendar(true)} className="datePickerContent">{displayContent}</div>
            {renderCalendar()}
        </div>
    );
}
