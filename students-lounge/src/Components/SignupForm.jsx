import LabeledInput from "./LabeledInput";


function SignupForm(props){

    const { formAction } = props;
    
    return(
        <form action={formAction}>
            <LabeledInput
             inputType ="text"
             inputId = "firstNameInput"
             inputName = "firstName"
             inputPlaceholder = "Enter Name"
             labelText = "First Name"
             />

             <LabeledInput
             inputType ="text"
             inputId = "lastNameInput"
             inputName = "lastName"
             inputPlaceholder = "Enter Name"
             labelText = "Last Name"
             />

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

            <LabeledInput
             inputType ="radio"
             inputId = "studentInput"
             inputName = "occupation"
             inputPlaceholder = ""
             labelText = "Student"
             />

            <LabeledInput
             inputType ="radio"
             inputId = "teacherInput"
             inputName = "occupation"
             inputPlaceholder = ""
             labelText = "Teacher"
             />

            <LabeledInput
             inputType ="checkbox"
             inputId = "termsInput"
             inputName = "terms"
             inputPlaceholder = ""
             labelText = "I agree to the Terms and Conditions"
             />

            <button>Sign up</button>
        </form>
    )
}

export default SignupForm;