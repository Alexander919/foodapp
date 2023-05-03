import classes from "./Form.module.css";
import useInput from "../hooks/useInput";

function Form({placeOrder}) {
    const {
        "form-control": formControl,
        invalid,
        "control-group": controlGroup,
        "error-text": errorText,
        "form-actions": formActions
    } = classes;

    const [name, nameFieldError, nameOnChange, nameOnBlur, nameResetField, nameSetFieldError] = useInput((value) => value.length > 0);
    const [lastName, lastNameFieldError, lastNameOnChange, lastNameOnBlur, lastNameResetField, lastNameSetFieldError] = useInput((value) => value.length > 0);
    const [email, emailFieldError, emailOnChange, emailOnBlur, emailResetField, emailSetFieldError] = useInput((value) => /^\S+@\S+\.\S+$/.test(value));


    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (nameSetFieldError() + lastNameSetFieldError() + emailSetFieldError()) { //false = 0, true = 1
            return;
        }
        placeOrder({name, lastName, email});
        console.log("submitting", name, lastName, email);
        nameResetField();
        lastNameResetField();
        emailResetField();
    };

    const nameInputClasses = nameFieldError ? `${formControl} ${invalid}` : formControl;
    const lastNameInputClasses = lastNameFieldError ? `${formControl} ${invalid}` : formControl;
    const emailInputClasses = emailFieldError ? `${formControl} ${invalid}` : formControl;

    return (
        <form onSubmit={formSubmitHandler}>
            <div className={controlGroup}>
                <div className={nameInputClasses}>
                    <label htmlFor='name'>First Name</label>
                    <input value={name} onChange={nameOnChange} onBlur={nameOnBlur} type='text' id='name' />
                    {nameFieldError && <p className={errorText}>Name must have a value</p>}
                </div>
                <div className={lastNameInputClasses}>
                    <label htmlFor='last-name'>Last Name</label>
                    <input value={lastName} onChange={lastNameOnChange} onBlur={lastNameOnBlur} type='text' id='last-name' />
                    {lastNameFieldError && <p className={errorText}>Last name must have a value</p>}
                </div>
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='email'>E-Mail Address</label>
                <input value={email} onChange={emailOnChange} onBlur={emailOnBlur} type='text' id='email' />
                {emailFieldError && <p className={errorText}>Invalid email</p>}
            </div>
            <div className={formActions}>
                <button>Submit</button>
            </div>
        </form>
    );
}

export default Form;