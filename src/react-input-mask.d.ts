// react-input-mask.d.ts
declare module "react-input-mask" {
  import * as React from "react";

  interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    maskChar?: string;
    formatChars?: { [key: string]: string };
    alwaysShowMask?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
    beforeMaskedValueChange?: (
      newState: { value: string; selection: { start: number; end: number } },
      oldState: { value: string; selection: { start: number; end: number } },
      userInput: string,
      options: {
        mask: string;
        maskChar: string;
        formatChars: { [key: string]: string };
      }
    ) => { value: string; selection: { start: number; end: number } };
  }

  const ReactInputMask: React.FC<Props>;

  export default ReactInputMask;
}
