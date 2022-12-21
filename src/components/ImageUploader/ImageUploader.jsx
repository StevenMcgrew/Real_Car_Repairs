import './ImageUploader.scoped.css';
import { useState, useEffect, useRef } from 'react';
import { drawOptimizedImage } from '../../utils/image-utils';
import { useSelector } from 'react-redux';

import LoadingIndicator from '../../loaders/LoadingIndicator/LoadingIndicator';

const ImageUploader = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [previewBgSize, setPreviewBgSize] = useState('auto');
    const [previewBgImage, setPreviewBgImage] = useState('');
    const degreesRef = useRef(0);
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    const imageFile = useSelector((state) => state.imageUploader.imageFile);
    const MAX_SIZE = { width: 800, height: 600 };

    useEffect(() => {
        imgRef.current.src = URL.createObjectURL(imageFile);
    }, []);

    const onImageLoad = () => {
        degreesRef.current = 0;
        drawOptimizedImage(canvasRef.current, imgRef.current, MAX_SIZE, degreesRef.current);
        updatePreview();
    };

    const updatePreview = () => {
        if (canvasRef.current.width < imgRef.current.clientWidth &&
            canvasRef.current.height < imgRef.current.clientHeight) {
            setPreviewBgSize('auto');
        }
        else {
            setPreviewBgSize('contain');
        }
        setPreviewBgImage(`url(${canvasRef.current.toDataURL()})`);
    };

    return (
        <div className="upload-preview-container">
            <div
                id='uploadPreview'
                className="upload-preview"
                style={{
                    backgroundSize: previewBgSize,
                    backgroundImage: previewBgImage,
                }}
            >
                {isUploading ? <LoadingIndicator msg='Please wait! Uploading...' /> : null}
            </div>
            <div className="upload-btn-panel">
                <button id="anticlockwiseBtn" className="anticlockwise-btn rotate-btn">&#8634;</button>
                <button id="clockwiseBtn" className="clockwise-btn rotate-btn">&#8635;</button>
                <button id="uploadBtn" className="upload-btn">Upload Image</button>
            </div>
            <img ref={imgRef} onLoad={onImageLoad} style={{ display: 'none' }} />
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default ImageUploader;