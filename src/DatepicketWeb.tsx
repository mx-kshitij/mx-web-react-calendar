import { ReactElement, createElement, useState, useEffect, useCallback } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, DayValue } from "react-modern-calendar-datepicker";
import { DatepicketWebContainerProps } from "../typings/DatepicketWebProps";
import { ValueStatus } from "mendix";

import "./ui/DatepicketWeb.css";

export function DatepicketWeb({
    displayContent,
    attribute,
    minimumDateAttribute,
    maximumDateAttribute,
    colorPrimary,
    calendarClassName,
    calendarTodayClassName,
    calendarSelectedDayClassName
}: DatepicketWebContainerProps): ReactElement {

    if ((attribute && attribute.status === ValueStatus.Loading) || (minimumDateAttribute && minimumDateAttribute.status === ValueStatus.Loading) || (maximumDateAttribute && maximumDateAttribute.status === ValueStatus.Loading)) return (<div />);

    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
    const [showCalendar, setShowCalendar] = useState<Boolean>(false);

    useEffect(() => {
        if (attribute.value)
            setSelectedDay({
                year: attribute.value?.getFullYear(),
                month: attribute.value?.getMonth(),
                day: attribute.value?.getDate()
            })
    }, [])

    const onDateChange = useCallback((newDate: DayValue) => {
        if (newDate) {
            setSelectedDay({
                year: newDate.year,
                month: newDate.month,
                day: newDate.day
            })
            attribute.setValue(new Date(newDate.year,newDate.month,newDate.day));
            setShowCalendar(false);
        }
    }, [setSelectedDay, setShowCalendar])

    const renderCalendar = useCallback((showCalendar) => {
        if (showCalendar) {
            return(
                <div className="calendarOuterDiv">
                    <Calendar
                        value={selectedDay}
                        onChange={newvalue => onDateChange(newvalue)}
                        colorPrimary={colorPrimary?.value}
                        calendarClassName={calendarClassName?.value}
                        calendarTodayClassName={calendarTodayClassName?.value}
                        calendarSelectedDayClassName={calendarSelectedDayClassName?.value}
                    />
                </div>
            )
        }
        else {
            return(<div />)
        }
    }, [])

    return (
        <div onClick={() => setShowCalendar(true)} >
            <div className="datePickerContent">{displayContent}</div>
            {renderCalendar(showCalendar)}
        </div>
    );
}
