/**
 * This file was generated from DatepicketWeb.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue, EditableValue } from "mendix";

export interface DatepicketWebContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    displayContent: ReactNode;
    attribute: EditableValue<Date>;
    minimumDateAttribute?: EditableValue<Date>;
    maximumDateAttribute?: EditableValue<Date>;
    colorPrimary?: DynamicValue<string>;
    calendarClassName?: DynamicValue<string>;
    calendarTodayClassName?: DynamicValue<string>;
    calendarSelectedDayClassName?: DynamicValue<string>;
}

export interface DatepicketWebPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    displayContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    attribute: string;
    onAttributeValueChange: {} | null;
    minimumDateAttribute: string;
    maximumDateAttribute: string;
    colorPrimary: string;
    calendarClassName: string;
    calendarTodayClassName: string;
    calendarSelectedDayClassName: string;
}
