import { useState } from "react";

function useInput(validate) {
    const [value, setValue] = useState("");
    const [touched, setTouched] = useState(false);

    const isValid = validate(value);
    const fieldError = !isValid && touched;

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        setTouched(true);
    };

    const resetField = () => {
        setValue("");
        setTouched(false);
    };

    const setFieldError = () => {
        if(!isValid) {
            setTouched(true);
            return true;
        }
        return false;
    };

    return [value, fieldError, onChange, onBlur, resetField, setFieldError];
}

export default useInput;