import LabeledInput from "./LabeledInput";
//import SignupForm from "./SignupForm";

function LoginForm(props){

    const { formAction } = props;
    
    return(
        <form action={formAction}>
            <LabeledInput
             inputType ="text"
             inputId = "emailInput"
             inputName = "email"
             inputPlaceholder = "Enter email"
             labelText = "E-mail"
             />

             <LabeledInput
             inputType ="password"
             inputId = "passwordInput"
             inputName = "password"
             inputPlaceholder = "Enter Password"
             labelText = "Password"
             />

            <button>Log in</button>

            <button>Create new account</button>

        </form>            
    )
}

export default LoginForm;