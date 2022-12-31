import './RepairStepInput.scoped.css';
import { imagesBaseUrl } from '../../config';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../../components/Modal/modalSlice';
import { setStepNum } from '../../forms/CreationForm/creationFormSlice.js';
import classNames from 'classnames';

import { CaretSortIcon } from '@radix-ui/react-icons';

const RepairStepInput = (props) => {
    const { index, img, text, imageChanged, deleteClicked, imgFieldName, textFieldName } = props;
    const [previewBgSize, setPreviewBgSize] = useState('contain');
    const [previewBgImage, setPreviewBgImage] = useState('');
    const [repairText, setRepairText] = useState('');
    const dispatch = useDispatch();

    const showImageUploader = () => {
        dispatch(setStepNum(index + 1));
        dispatch(showModal({ title: 'Image Uploader', content: 'ImageUploader' }));
    };

    const removeImage = () => {
        setPreviewBgImage('');
    };

    const onTextChange = (e) => {
        setRepairText(e.currentTarget.value);
    };

    useEffect(() => {
        setRepairText(text);
        setPreviewBgImage(img);
    }, []);
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
                    <div
                        id='imgPreview'
                        className="img-preview"
                        style={{
                            backgroundSize: previewBgSize,
                            backgroundImage: previewBgImage ? `url(${imagesBaseUrl}/${previewBgImage})` : 'none',
                        }}
                    >
                        <div className="img-btns-box">
                            <button
                                type="button"
                                className={classNames({
                                    'transparent-btn': previewBgImage,
                                    'add-img-btn': !previewBgImage
                                })}
                                onClick={showImageUploader}
                            >
                                {previewBgImage ? 'Change' : 'Add Image'}
                            </button>
                            {previewBgImage ? <button type="button" className="transparent-btn" onClick={removeImage}>Remove</button> : null}
                        </div>
                    </div>
                </div>

                <div className="textarea-and-label">
                    <label htmlFor={textFieldName} className='step-text-label'>Enter instructions for this step</label>
                    <textarea
                        id={textFieldName}
                        name={textFieldName}
                        className="step-textarea"
                        maxLength="1000"
                        spellCheck={true}
                        wrap="hard"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoFocus={false}
                        value={repairText}
                        onChange={onTextChange}
                    >
                    </textarea>
                    <span className='form-error-text-spacer'>&nbsp;</span>
                    <span className='form-error-text'></span>
                </div>
            </div>

        </div>
    );
};

export default RepairStepInput;