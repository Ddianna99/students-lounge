
function LabeledInput(props){

    const { inputType, inputId, inputName, inputPlaceholder, labelText} = props;

    return(
        <div>
            <label for={inputId}>{labelText}</label><br></br>
            <input type={inputType} id={inputId} name={inputName} value={inputPlaceholder}/>
        </div>
    )
}

export default LabeledInput;