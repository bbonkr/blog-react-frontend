import React, {
    useCallback,
    useState,
    useEffect,
    FunctionComponent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Upload,
    Icon,
    Button,
    Card,
    Typography,
    Modal,
    Divider,
    Spin,
} from 'antd';
import moment from 'moment';
import StackGrid from 'react-stack-grid';
import { withSize, SizeMeProps } from 'react-sizeme';
import ImageViewer from './ImageViewer';
import CroppedImage from './CroppedImage';
import { actionTypes } from '../reducers/actionTypes';
import { IRootState, IMeState, IMediaFilesState } from '../typings/reduxStates';
import { appOptions } from '../config/appOptions';
import { IBlogAction } from '../typings/IBlogAction';
import { IImageModel } from '../typings/dto';
import { ButtonFullWidth } from '../styledComponents/Buttons';

const Paragraph = Typography.Paragraph;
const Dragger = Upload.Dragger;

export interface IFileListProps extends SizeMeProps {
    onSelect?: (item: any) => void;
}

const FileList: FunctionComponent<IFileListProps> = ({ size, onSelect }) => {
    const dispatch = useDispatch();

    const {} = useSelector<IRootState, IMeState>((s) => s.me);

    const {
        mediaFiles,
        mediaFilesLoading,
        mediaFilesHasMore,
        mediaFilesCurrentPage,
        mediaFilesLimit,
        mediaFilesUploading: uploading,
    } = useSelector<IRootState, IMediaFilesState>((s) => s.mediaFiles);

    const [imageViewerVisible, setImageViewerVisible] = useState(false);
    const [imageViewerFiles, setImageViewerFiles] = useState([]);
    const closeImageviewer = useCallback(() => {
        setImageViewerVisible(false);
    }, []);

    const [cardWidth, setCardWidth] = useState('100%');

    useEffect(() => {
        dispatch({
            type: actionTypes.LOAD_MY_MEDIA_FILES_CALL,
            data: {
                page: 1,
                limit: mediaFilesLimit,
                keyword: '',
            },
        });
    }, [dispatch, mediaFilesLimit]);

    useEffect(() => {
        const { width } = size;

        let columnWidth = '100%';

        if (width > 576) {
            columnWidth = '50%';
        }

        if (width > 768) {
            columnWidth = '33.33%';
        }

        if (width > 992) {
            columnWidth = '25.0%';
        }

        if (width > 1200) {
            columnWidth = '20%';
        }

        setCardWidth(columnWidth);
    }, [size]);

    const uploadBuffer = [];

    const onBeforeUploadFiles = useCallback(
        (file, fileList) => {
            // console.log('==========> file:', file);
            // console.log('==========> file list:', fileList);

            if (!uploading) {
                uploadBuffer.push(file);

                if (uploadBuffer.length === fileList.length) {
                    const formData = new FormData();
                    uploadBuffer.forEach((f) => {
                        formData.append('files', f);
                    });

                    dispatch({
                        type: actionTypes.UPLOAD_MY_MEDIA_FILES_CALL,
                        data: formData,
                    });

                    uploadBuffer.splice(0, uploadBuffer.length);
                }
            }
            return false;
        },
        [dispatch, uploadBuffer, uploading],
    );

    const onClickLoadMore = useCallback(() => {
        if (mediaFilesHasMore) {
            dispatch({
                type: actionTypes.LOAD_MY_MEDIA_FILES_CALL,
                data: {
                    page: (mediaFilesCurrentPage || 0) + 1,
                    limit: mediaFilesLimit,
                    keyword: '',
                },
            });
        }
    }, [dispatch, mediaFilesHasMore, mediaFilesLimit, mediaFilesCurrentPage]);

    const onClickImage = useCallback(
        (image) => () => {
            setImageViewerVisible(true);
            setImageViewerFiles([image]);
        },
        [],
    );

    const onClickDeleteFile = useCallback(
        (media: IImageModel) => () => {
            Modal.confirm({
                title: 'Do you want to delete this file?',
                content: `${media.fileName}${media.fileExtension}`,
                onOk: () => {
                    dispatch<IBlogAction>({
                        type: actionTypes.DELETE_MY_MEDIA_FILES_CALL,
                        data: {
                            id: media.id,
                        },
                    });
                },
                onCancel: null,
            });
        },
        [dispatch],
    );

    const onClickSelectFile = useCallback(
        (selectedItem) => () => {
            if (!!onSelect) {
                onSelect(selectedItem);
            }
        },
        [onSelect],
    );

    const getCardActions = (item) => {
        const actions = [];

        if (!!onSelect) {
            actions.push(
                <Icon type='check' onClick={onClickSelectFile(item)} />,
            );
        }

        actions.push(
            <Paragraph
                copyable={{
                    text: item.src,
                }}
            />,
        );
        actions.push(<Icon type='delete' onClick={onClickDeleteFile(item)} />);
        return actions;
    };

    return (
        <Spin spinning={mediaFilesLoading || uploading}>
            <Dragger
                disabled={uploading}
                supportServerRender={true}
                name='files'
                multiple={true}
                showUploadList={false}
                beforeUpload={onBeforeUploadFiles}>
                <p className='ant-upload-drag-icon'>
                    <Icon type='inbox' />
                </p>
                <p className='ant-upload-text'>
                    Click or drag file to this area to upload
                </p>
                <p className='ant-upload-hint'>
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                </p>
            </Dragger>

            <Divider />

            <StackGrid
                columnWidth={cardWidth}
                gutterWidth={16}
                gutterHeight={16}
                enableSSR={true}
                monitorImagesLoaded={true}>
                {mediaFiles.map((item) => {
                    const filename = `${item.fileName}${item.fileExtension}`;
                    return (
                        <div key={+item.id}>
                            <Card
                                cover={
                                    item.contentType.indexOf('image') >= 0 && (
                                        <CroppedImage
                                            image={item}
                                            onClickHandler={onClickImage}
                                        />
                                    )
                                }
                                actions={getCardActions(item)}>
                                <Card.Meta
                                    title={filename}
                                    description={
                                        <span>
                                            <Icon type='clock-circle' />{' '}
                                            {moment(
                                                new Date(item.createdAt),
                                                'YYYY-MM-DD HH:mm:ss',
                                            ).fromNow()}
                                        </span>
                                    }
                                />
                                <div style={{ textOverflow: 'ellipsis' }}>
                                    <Paragraph
                                        copyable={{
                                            text: item.src,
                                        }}>
                                        {`${item.fileName}${item.fileExtension}`}
                                    </Paragraph>
                                </div>
                            </Card>
                        </div>
                    );
                })}
            </StackGrid>
            <Divider />
            <ButtonFullWidth
                loading={mediaFilesLoading || uploading}
                onClick={onClickLoadMore}
                disabled={!mediaFilesHasMore}>
                Load more
            </ButtonFullWidth>

            <ImageViewer
                files={imageViewerFiles}
                visible={imageViewerVisible}
                closeImageviewer={closeImageviewer}
            />
        </Spin>
    );
};

export default withSize({ noPlaceholder: true })(FileList);
