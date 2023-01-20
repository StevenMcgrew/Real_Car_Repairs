import './ImageUploader.scoped.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStepImg } from '../../forms/CreationForm/creationFormSlice.js';
import { showLoader, hideLoader } from '../../loaders/LoadingIndicator/loadingIndicatorSlice';
import { showToast } from '../Toast/toastSlice';
import { hideModal, showModal } from '../Modal/modalSlice';
import { drawOptimizedImage, isValidMIME } from '../../utils/image-utils';
import { formatAxiosError } from '../../utils/general-utils';
import { apiBaseUrl } from '../../config.js';
import axios from 'axios';
import classNames from 'classnames';


const ImageUploader = () => {
    const [previewBgSize, setPreviewBgSize] = useState('auto');
    const [previewBgImage, setPreviewBgImage] = useState('');
    const degreesRef = useRef(0);
    const previewRef = useRef(null);
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    const postId = useSelector(state => state.creationForm.post.id);
    const imgStepNum = useSelector(state => state.creationForm.imgStepNum);
    const steps = useSelector(state => state.creationForm.post.steps);
    const MAX_SIZE = { width: 800, height: 450 };
    const dispatch = useDispatch();

    const onImageChange = (e) => {
        if (!e.target.files.length) { return; }
        let file = e.target.files[0];
        if (!isValidMIME(file.type)) { dispatch(showToast({ content: 'Invalid image type. Must be one of:  .jpg, .jpeg, .png, .bmp' })); return; }
        // Set the src of the img element, which will then trigger the onLoad event for the img element
        imgRef.current.src = URL.createObjectURL(file);
    };

    const onImageLoad = () => {
        degreesRef.current = 0;
        drawOptimizedImage(canvasRef.current, imgRef.current, MAX_SIZE, degreesRef.current);
        updatePreview();
    };

    const updatePreview = () => {
        if (canvasRef.current.width < previewRef.current.clientWidth &&
            canvasRef.current.height < previewRef.current.clientHeight) {
            setPreviewBgSize('auto');
        }
        else {
            setPreviewBgSize('contain');
        }
        setPreviewBgImage(`url(${canvasRef.current.toDataURL()})`);
    };

    const rotateImage = (rotationDirection) => {
        const newDegrees = drawOptimizedImage(canvasRef.current, imgRef.current, MAX_SIZE, degreesRef.current, rotationDirection);
        degreesRef.current = newDegrees;
        updatePreview();
    };

    const uploadImage = () => {
        dispatch(showLoader('Please Wait! Uploading image...'));
        let formData = new FormData();

        // Append old file name if exists
        if (steps[imgStepNum - 1].img) {
            formData.append('oldFileName', steps[imgStepNum - 1].img);
        }

        // canvas.toBlob, append to formData, send to server
        canvasRef.current.toBlob(function (blob) {
            formData.append('image', blob);
            let url = `${apiBaseUrl}/images?postId=${postId}&stepNum=${imgStepNum}`;
            axios.post(url, formData)
                .then(function (response) {
                    dispatch(setStepImg({ stepNum: imgStepNum, newImg: response.data.fileName }));
                    dispatch(hideModal());
                })
                .catch(function (error) {
                    console.log(error);
                    const msg = formatAxiosError(error);
                    dispatch(showModal({ title: 'Error', content: msg }));
                })
                .finally(function () {
                    dispatch(hideLoader());
                });
        }, 'image/jpeg', 1.0);
    };

    return (
        <div className="upload-preview-container">

            <label className='wrapping-label'>
                <span className="add-img-label">{previewBgImage ? 'CHANGE IMAGE' : 'GET IMAGE'}</span>
                <input
                    className="hidden-img-input"
                    type="file"
                    accept=".jpg, .jpeg, .png, .bmp"
                    onChange={onImageChange}
                />
            </label>

            <div ref={previewRef} id='uploadPreview' className="upload-preview" style={{ backgroundSize: previewBgSize, backgroundImage: previewBgImage, }}></div>

            <div className="upload-btn-panel">
                <div className='rotate-btns-panel'>
                    <button className={classNames('anticlockwise-btn rotate-btn', { 'disabled': !previewBgImage })} onClick={() => rotateImage('anticlockwise')}>&#8634;</button>
                    <span className={classNames({ 'disabled': !previewBgImage })} style={{ backgroundColor: 'transparent' }}>Rotate</span>
                    <button className={classNames('clockwise-btn rotate-btn', { 'disabled': !previewBgImage })} onClick={() => rotateImage('clockwise')}>&#8635;</button>
                </div>
                <button className={classNames('upload-btn', { 'disabled': !previewBgImage })} onClick={uploadImage}>Upload Image</button>
            </div>

            <img ref={imgRef} onLoad={onImageLoad} style={{ display: 'none' }} />
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default ImageUploader;