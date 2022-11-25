import './TextInput.scoped.css';
import { useField } from 'formik';

const TextInput = ({ label, labelWidth, fieldWidth, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='custom-form-group'>
      <label htmlFor={props.name} style={{ width: labelWidth }}>{label}</label>
      <div className='input-and-error-group'>
        <input id={props.name} name={props.name} {...field} {...props}
          style={{ maxWidth: fieldWidth }}
        />
        <span className='form-error-text-spacer'>&nbsp;</span>
        {meta.touched && meta.error
          ? <span className='form-error-text'>{meta.error}</span>
          : null
        }
      </div>
    </div>
  );
};

export default TextInput;