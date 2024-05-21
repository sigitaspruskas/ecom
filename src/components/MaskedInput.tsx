import React from "react";
import { useField, FieldHookConfig } from "formik";
import InputMask from "react-input-mask";

interface MaskedInputProps {
  mask: string;
  placeholder?: string;
  name: string;
}

const MaskedInput: React.FC<MaskedInputProps & FieldHookConfig<string>> = ({
  mask,
  placeholder,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div className={`input-wrapper ${props.name}`}>
      <InputMask {...field} mask={mask} placeholder={placeholder} />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MaskedInput;
