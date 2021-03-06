import React, { FunctionComponent, useCallback } from "react";
import { ImageModel } from "../typings/dto";
import { appOptions } from "../config/appOptions";

export interface CroppedImageProps {
    image: ImageModel;
    altText?: string;
    onClickHandler?: (image: ImageModel) => void;
}

const CroppedImage: FunctionComponent<CroppedImageProps> = ({
    image,
    altText,
    onClickHandler
}) => {
    const filename = `${image.fileName}${image.fileExtension}`;

    const onClickImage = useCallback(
        (e: React.MouseEvent<HTMLImageElement, MouseEvent>): void => {
            if (onClickHandler) {
                onClickHandler(image);
            }
        },
        []
    );
    let src = decodeURIComponent(image.src);
    if (src.startsWith("/")) {
        src = `${appOptions.apiBaseUrl}${src}`;
    }

    return (
        <>
            <figure
                style={{
                    width: "100%",
                    height: "20rem",
                    overflow: "hidden",
                    margin: "0"
                }}
            >
                <img
                    style={{
                        display: "block",
                        width: "177.777%",
                        margin: "0 -38.885%"
                    }}
                    src={src}
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
