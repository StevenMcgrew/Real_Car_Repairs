import './RepairStepInput.scoped.css';
import { isValidMIME } from '../../utils/image-utils';
import { imagesBaseUrl } from '../../config';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../../components/Modal/modalSlice';
import { setImageFile } from '../../components/ImageUploader/imageUploaderSlice';

import { CaretSortIcon } from '@radix-ui/react-icons';

const RepairStepInput = (props) => {
    const { index, img, text, imageChanged, deleteClicked, imgFieldName, textFieldName } = props;
    const [previewBgSize, setPreviewBgSize] = useState('auto');
    const [previewBgImage, setPreviewBgImage] = useState('');
    const [repairText, setRepairText] = useState('');
    const canvasRef = useRef(document.getElementById('uploadCanvas'));
    const previewRef = useRef(document.getElementById('uploadPreview'));
    const imageRef = useRef(document.getElementById('uploadImage'));
    const dispatch = useDispatch();

    const onImageChange = (e) => {
        if (!e.target.files.length) { return; }
        let file = e.target.files[0];
        if (!isValidMIME(file.type)) { alert('Invalid image type. Must be one of:  .jpg, .jpeg, .png, .bmp'); return; }
        dispatch(setImageFile(file));
        dispatch(showModal({ title: 'Image Uploader', content: 'ImageUploader' }));
    };

    const updatePreview = () => {
        if (canvasRef.current.width < previewRef.current.clientWidth &&
            canvasRef.current.height < previewRef.current.clientHeight) {
            setPreviewBgSize('auto');
        }
        else {
            setPreviewBgSize('contain');
        }
        setPreviewBgImage(canvasRef.current.toDataURL());
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
                            backgroundImage: `url(${previewBgImage})`,
                        }}
                    >
                        <div className="img-btns-box">
                            <label className='wrapping-label'>
                                <span className="add-img-label"
                                    style={previewBgImage
                                        ? {
                                            backgroundColor: '#0000007a',
                                            color: 'white',
                                            border: 'none',
                                            boxShadow: 'inset 0 0 0 1px #0000007a, inset 0 0 0 2px white'
                                        }
                                        : {}}>
                                    {previewBgImage ? 'Change' : 'Add Image'}
                                </span>
                                <input
                                    className="hidden-img-input"
                                    name={imgFieldName}
                                    type="file"
                                    accept=".jpg, .jpeg, .png, .bmp"
                                    onChange={onImageChange}
                                />
                            </label>
                            {previewBgImage ? <button type="button" className="remove-img-btn" onClick={removeImage}>Remove</button> : null}
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