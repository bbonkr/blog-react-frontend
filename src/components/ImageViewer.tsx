import React, {
    useState,
    useCallback,
    useEffect,
    FunctionComponent,
} from 'react';
import { PageHeader, Carousel, Icon, Typography } from 'antd';
import FullSizeModal from '../styledComponents/FullSizeModal';
import { IImageModel } from '../typings/IImageModel';

export interface IImageViewerProps {
    files: IImageModel[];
    visible: boolean;
    closeImageviewer: () => void;
}

const ImageViewer: FunctionComponent<IImageViewerProps> = ({
    files,
    visible,
    closeImageviewer,
}) => {
    const [title, setTitle] = useState('Image viewer');
    // const [url, setUrl] = useState('');
    const [fullUrl, setFullUrl] = useState('');

    useEffect(() => {
        if (files && files.length > 0) {
            const file = files[0];
            setTitle(`${file.fileName}${file.fileExtension}`);
            // setUrl(file.src);
            setFullUrl(`${window.location.origin}${file.src}`);
        }
    }, [files]);

    const onAafterChange = useCallback(
        (current: number): void => {
            const file = files[current];
            setTitle(`${file.fileName}${file.fileExtension}`);
            // setUrl(file.url);
            setFullUrl(`${window.location.origin}${file.src}`);
        },
        [files],
    );

    return (
        <FullSizeModal
            footer={false}
            visible={visible}
            maskClosable={true}
            onCancel={closeImageviewer}
            width='100%'>
            <PageHeader
                title={
                    <Typography.Title level={3} copyable={{ text: fullUrl }}>
                        <Icon type='file-image' /> {title}
                    </Typography.Title>
                }
                extra={
                    [
                        // <Typography.Title
                        //     key="copy"
                        //     level={3}
                        //     copyable={fullUrl}
                        // />,
                    ]
                }
            />

            <Carousel style={{ width: '100%' }} afterChange={onAafterChange}>
                {files.map((f) => {
                    return (
                        <div key={f.id} style={{ textAlign: 'center' }}>
                            <img
                                src={f.src}
                                alt={`${f.fileName}${f.fileExtension}`}
                                style={{ maxWidth: '100%', margin: '0 auto' }}
                            />
                        </div>
                    );
                })}
            </Carousel>
        </FullSizeModal>
    );
};

export default ImageViewer;
