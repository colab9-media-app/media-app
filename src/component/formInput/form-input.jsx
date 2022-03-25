import "./form-input.scss"

const FormInput = ({ handleChange, label, ...otherProps }) => {
    return ( 
        <div className='group'>
          {label ? (<label className="form-input-label"> {label} </label>) : null} <br />
        <input className='form-input' onChange={handleChange} {...otherProps} />
      </div>

     );
}
 
export default FormInput;