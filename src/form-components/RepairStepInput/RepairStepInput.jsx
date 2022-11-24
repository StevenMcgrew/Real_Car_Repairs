import './RepairStepInput.scoped.css';
import { imagesBaseUrl } from '../../config';
import { useField } from 'formik';

import { CaretSortIcon } from '@radix-ui/react-icons';

const RepairStepInput = (props) => {
  const { index, img, text, deleteClicked, imgFieldName, textFieldName } = props;
  const [imgField, imgMeta] = useField({ ...props, name: imgFieldName });
  const [textField, textMeta] = useField({ ...props, name: textFieldName });

  return (
    <div className='card step-root'>

      <div className='step-header'>
        <div className='drag-handle'>
          <CaretSortIcon className='sort-icon' />
        </div>
        <span>{`Repair Step ${index + 1}`}</span>
        <span className="close-btn" onClick={() => deleteClicked(index)}>&times;</span>
      </div>

      <div className='step-body'>
        <div>
          <span className="img-info">Image (optional)</span>
          <div className="img-preview" style={img ? { backgroundImage: `url(${imagesBaseUrl}${img})` } : {}}>
            <div className="img-btns-box">
              <label className='wrapping-label'>
                <span className="add-img-label">Add Image</span>
                <input className="hidden-img-input"
                  type="file"
                  accept=".jpg, .jpeg, .png, .bmp, .gif"
                  {...imgField}
                  name={imgFieldName} />
              </label>
              <button type="button" className="remove-img-btn">Remove</button>
            </div>
          </div>
        </div>
        <div className="textarea-and-label">
          <label htmlFor={textFieldName} className='step-text-label'>Enter instructions for this step</label>
          <textarea
            {...textField}
            id={textFieldName}
            name={textFieldName}
            className="step-textarea"
            maxLength="1000"
            spellCheck={true}
            wrap="hard"
            autoCapitalize="none"
            autoComplete="off"
            autoFocus={false}
            value={text}
          >
          </textarea>
          <span className='form-error-text-spacer'>&nbsp;</span>
          {textMeta.touched && textMeta.error
            ? <span className='form-error-text'>{textMeta.error}</span>
            : null}
        </div>
      </div>

    </div>
  );
};

export default RepairStepInput;