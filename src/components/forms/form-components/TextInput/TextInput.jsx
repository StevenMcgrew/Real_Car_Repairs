import './TextInput.scoped.css';
import { useField } from 'formik';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className='input-label' htmlFor={props.name}>{label}</label>
      <input className='text-input' id={props.name} name={props.name} {...field} {...props} />
      <span className='form-error-text-spacer'>&nbsp;</span>
      {meta.touched && meta.error
        ? <span className='form-error-text'>{meta.error}</span>
        : null
      }
    </>
  );
};

export default TextInput;