import './RepairStepInput.scoped.css';
import { imagesBaseUrl } from '../../config';
import { useField } from 'formik';
import { useState } from 'react';

import { CaretSortIcon } from '@radix-ui/react-icons';

const RepairStepInput = (props) => {
  const { index, img, text, deleteClicked, imgFieldName, textFieldName } = props;
  const [imgField, imgMeta] = useField({ ...props, name: imgFieldName });
  const [textField, textMeta] = useField({ ...props, name: textFieldName });
  const [previewImg, setPreviewImg] = useState('');

  const handleImageChoice = (e) => {
    const [file] = e.currentTarget.files;
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setPreviewImg('');
  };

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
          <div className="img-preview" style={previewImg ? { backgroundImage: `url(${previewImg})` } : {}}>
            <div className="img-btns-box">
              <label className='wrapping-label'>
                <span className="add-img-label"
                  style={previewImg
                    ? {
                      backgroundColor: '#0000007a',
                      color: 'white',
                      border: 'none',
                      boxShadow: 'inset 0 0 0 1px #0000007a, inset 0 0 0 2px white'
                    }
                    : {}}>
                  {previewImg ? 'Change' : 'Add Image'}
                </span>
                <input className="hidden-img-input"
                  type="file"
                  accept=".jpg, .jpeg, .png, .bmp, .gif"
                  {...imgField}
                  name={imgFieldName}
                  onChange={handleImageChoice} />
              </label>
              {previewImg ? <button type="button" className="remove-img-btn" onClick={removeImage}>Remove</button> : null}
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