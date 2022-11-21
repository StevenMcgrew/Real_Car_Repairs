import './TextInput.scoped.css';
import { useField } from 'formik';

const TextInput = ({ label, labelWidth, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className='root-container'>
      <label className='input-label' htmlFor={props.name} style={{ width: labelWidth }}>{label}</label>
      <div className='input-container'>
        <input className='text-input' id={props.name} name={props.name} {...field} {...props} />
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