import { ReactElement, createElement } from "react";
// import { HelloWorldSample } from "./components/HelloWorldSample";
import { DatepickerWebPreviewProps } from "../typings/DatepickerWebProps";

export function preview({ }: DatepickerWebPreviewProps): ReactElement {
    return <div/>;
}

export function getPreviewCss(): string {
    return require("./ui/DatepickerWeb.css");
}
