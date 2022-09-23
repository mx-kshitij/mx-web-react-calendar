import { ReactElement, createElement } from "react";
// import { HelloWorldSample } from "./components/HelloWorldSample";
import { DatepicketWebPreviewProps } from "../typings/DatepicketWebProps";

export function preview({ }: DatepicketWebPreviewProps): ReactElement {
    return <div/>;
}

export function getPreviewCss(): string {
    return require("./ui/DatepicketWeb.css");
}
