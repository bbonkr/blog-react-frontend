import { IMediaFilesState } from '../typings/reduxStates';
import { IBlogAction } from '../typings/IBlogAction';
import produce from 'immer';
import { actionTypes } from './actionTypes';

export const initialMediaFilesState: IMediaFilesState = {
    mediaFiles: [],
    mediaFilesSearchKeyword: '',
    mediaFilesCount: 0,
    mediaFilesLimit: 10,
    mediaFilesHasMore: false,
    mediaFilesLoading: false,
    mediaFilesErrorReason: '',
    mediaFilesUploading: false,
    mediaFilesCurrentPage: 1,
};

export const mediaFiles = (
    state: IMediaFilesState = initialMediaFilesState,
    action: IBlogAction,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.LOAD_MY_MEDIA_FILES_CALL:
                draft.mediaFiles = action.data.page ? draft.mediaFiles : [];
                draft.mediaFilesHasMore = action.data.page
                    ? draft.mediaFilesHasMore
                    : true;
                draft.mediaFilesLoading = true;
                draft.mediaFilesErrorReason = '';
                break;
            case actionTypes.LOAD_MY_MEDIA_FILES_DONE:
                action.data.records.forEach((v) => {
                    const mediaIndex = draft.mediaFiles.findIndex(
                        (x) => x.id === v.id,
                    );
                    if (mediaIndex < 0) {
                        draft.mediaFiles.push(v);
                    }
                });

                draft.mediaFilesHasMore =
                    action.data.records.length === draft.mediaFilesLimit;
                draft.mediaFilesLoading = false;
                draft.mediaFilesSearchKeyword = action.message;
                draft.mediaFilesCurrentPage = action.data.page;
                break;
            case actionTypes.LOAD_MY_MEDIA_FILES_FAIL:
                draft.mediaFilesLoading = true;
                draft.mediaFilesErrorReason = action.message;
                break;
            case actionTypes.UPLOAD_MY_MEDIA_FILES_CALL:
                draft.mediaFilesUploading = true;
                break;
            case actionTypes.UPLOAD_MY_MEDIA_FILES_DONE:
                draft.mediaFiles = action.data.records.concat(draft.mediaFiles);
                draft.mediaFilesUploading = false;
                break;
            case actionTypes.UPLOAD_MY_MEDIA_FILES_FAIL:
                draft.mediaFilesUploading = false;
                break;
            case actionTypes.DELETE_MY_MEDIA_FILES_CALL:
                draft.mediaFilesUploading = true;
                break;
            case actionTypes.DELETE_MY_MEDIA_FILES_DONE:
                const foundId = draft.mediaFiles.findIndex(
                    (x) => x.id === action.data.id,
                );
                draft.mediaFiles.splice(foundId, 1);
                draft.mediaFilesUploading = false;
                break;
            case actionTypes.DELETE_MY_MEDIA_FILES_FAIL:
                draft.mediaFilesUploading = false;
                break;
            default:
                break;
        }
    });
