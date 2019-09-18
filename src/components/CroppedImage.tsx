import React, { FunctionComponent, useCallback } from 'react';
import { IImageModel } from '../typings/dto';

export interface ICroppedImageProps {
    image: IImageModel;
    altText?: string;
    onClickHandler?: (image: IImageModel) => void;
}

const CroppedImage: FunctionComponent<ICroppedImageProps> = ({
    image,
    altText,
    onClickHandler,
}) => {
    const filename = `${image.fileName}${image.fileExtension}`;

    const onClickImage = useCallback(
        (e: React.MouseEvent<HTMLImageElement, MouseEvent>): void => {
            if (onClickHandler) {
                onClickHandler(image);
            }
        },
        [],
    );

    return (
        <>
            <figure
                style={{
                    width: '100%',
                    height: '20rem',
                    overflow: 'hidden',
                    margin: '0',
                }}>
                <img
                    style={{
                        display: 'block',
                        width: '177.777%',
                        margin: '0 -38.885%',
                    }}
                    src={decodeURIComponent(image.src)}
                    alt={altText || filename}
                    onClick={onClickImage}
                />
            </figure>
        </>
    );
};

// CroppedImage.propTypes = {
//     image: PropTypes.object.isRequired,
//     altText: PropTypes.string,
//     onClickHandler: PropTypes.func,
// };

export default CroppedImage;
