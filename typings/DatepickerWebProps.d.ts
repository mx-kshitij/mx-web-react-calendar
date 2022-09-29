/**
 * This file was generated from DatepickerWeb.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue, EditableValue, ListValue, ListAttributeValue } from "mendix";

export interface DatepickerWebContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    displayContent: ReactNode;
    attribute: EditableValue<Date>;
    disabledDaysSource?: ListValue;
    disabledDaysAttribute?: ListAttributeValue<Date>;
    minimumDateAttribute?: EditableValue<Date>;
    maximumDateAttribute?: EditableValue<Date>;
    colorPrimary?: DynamicValue<string>;
    calendarClassName?: DynamicValue<string>;
    calendarTodayClassName?: DynamicValue<string>;
    calendarSelectedDayClassName?: DynamicValue<string>;
}

export interface DatepickerWebPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    displayContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    attribute: string;
    onAttributeValueChange: {} | null;
    disabledDaysSource: {} | { type: string } | null;
    disabledDaysAttribute: string;
    minimumDateAttribute: string;
    maximumDateAttribute: string;
    colorPrimary: string;
    calendarClassName: string;
    calendarTodayClassName: string;
    calendarSelectedDayClassName: string;
}
