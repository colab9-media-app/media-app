import "./form-input.scss";

const FormInput = ({
  handleChange,
  label,
  placeholder,
  style,
  ...otherProps
}) => {
  return (
    <div className="group">
      {label ? <label className="form-input-label"> {label} </label> : null}{" "}
      <br />
      <input
        className={"form-input"}
        onChange={handleChange}
        {...otherProps}
        style={style}
      />
    </div>
  );
};

export default FormInput;
