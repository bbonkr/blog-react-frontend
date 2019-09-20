import React, {
    useState,
    useCallback,
    useEffect,
    FunctionComponent,
    useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Select, Form, Button, Tabs, Icon, Modal } from 'antd';
import Markdown from 'react-markdown';
import showdown from 'showdown';
import xssFilter from 'showdown-xss-filter';
import FullSizeModal from '../styledComponents/FullSizeModal';
import FileList from './FileList';
import { WriteFormValaidator } from '../helpers/WriteFormValaidator';
import { actionTypes } from '../reducers/actionTypes';
import { IRootState, IMeState } from '../typings/reduxStates';
import TextArea from 'antd/lib/input/TextArea';
import { ContentTextArea } from '../styledComponents/ContentTextArea';
import { MarkdownPreview } from '../styledComponents/MarkdownPreview';
import { ShowNotification } from './ShowNotification';

const PLACEHOLDER_MARKDOWN = 'Write your thought!';
const SELECT_FILE_TARGET_MARKDOWN = 'markdown';
const SELECT_FILE_TARGET_COVERIMAGE = 'coverimage';
// const TextArea = Input.TextArea;

export interface IWritePostFormProps {
    id?: number;
}

const Validator = new WriteFormValaidator();

const WritePostForm: FunctionComponent<IWritePostFormProps> = ({ id }) => {
    const dispatch = useDispatch();

    // https://github.com/showdownjs/showdown/wiki/Showdown-options
    const markdownConverter = new showdown.Converter(
        {
            omitExtraWLInCodeBlocks: false,
            noHeaderId: false,
            ghCompatibleHeaderId: true,
            prefixHeaderId: true,
            headerLevelStart: 1,
            parseImgDimensions: true,
            simplifiedAutoLink: true,
            excludeTrailingPunctuationFromURLs: true,
            literalMidWordUnderscores: true,
            strikethrough: true,
            tables: true,
            tasklists: true,
            ghMentions: false,
            ghMentionsLink: false,
            ghCodeBlocks: true,
            smartIndentationFix: true,
            smoothLivePreview: true,
            disableForced4SpacesIndentedSublists: true,
            simpleLineBreaks: true,
            requireSpaceBeforeHeadingText: true,
            encodeEmails: true,
        },
        {
            extensions: [xssFilter],
        },
    );
    // const { myPost } = useSelector(s => s.me);

    const {
        categories,
        tags,
        loadingCategories,
        loadingTags,
        myPost,
    } = useSelector<IRootState, IMeState>((s) => s.me);

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [markdown, setMarkdown] = useState('');
    const [html, setHtml] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategoryValues, setSelectedCategoryValues] = useState([]);
    const [selectedTagValues, setSelectedTagValues] = useState([]);
    const [fileListVisible, setFileListVisible] = useState(false);
    // const [initCategories, setInitCategories] = useState([]);
    // const [initTags, setInitTags] = useState([]);

    const [selectFileTarget, setSelectFileTarget] = useState('');

    const [titleErrorMessage, setTitleErrorMessage] = useState('');
    const [markdownErrorMessage, setMarkdownErrorMessage] = useState('');
    const [categoriesErrorMessage, setCategoriesErrorMessage] = useState('');

    const markdownRef: React.LegacyRef<HTMLTextAreaElement> = useRef();

    useEffect(() => {
        if (id && myPost) {
            setTitle(myPost.title);
            setSlug(myPost.slug);
            setMarkdown(myPost.markdown);
            setCoverImage(myPost.coverImage);
            setSelectedCategoryValues(
                !!myPost.categories ? myPost.categories.map((v) => v.slug) : [],
            );
            setSelectedTagValues(
                !!myPost.tags ? myPost.tags.map((v) => v.slug) : [],
            );
            setSelectedCategories(
                myPost.categories
                    ? myPost.categories.map((v) => {
                          return { name: v.name, slug: v.slug };
                      })
                    : [],
            );
            setSelectedTags(
                myPost.tags
                    ? myPost.tags.map((v) => {
                          return {
                              name: v.name,
                              slug: v.slug,
                          };
                      })
                    : [],
            );
        } else {
            /** reset */
            setTitle('');
            setSlug('');
            setMarkdown('');
            setCoverImage('');
            setSelectedCategoryValues([]);
            setSelectedTagValues([]);
            setSelectedCategories([]);
            setSelectedTags([]);
        }
    }, [dispatch, id, myPost]);

    const onChangeTitle = useCallback(
        (e) => {
            const newValue = e.target.value;
            setTitle(newValue);
            const { message } = Validator.checkTitle({ title: newValue });
            setTitleErrorMessage(message);

            if (
                !!newValue &&
                newValue.trim().length > 0 &&
                (!slug || slug.trim().length === 0)
            ) {
                setSlug(newValue.replace(/\s+/g, '-').toLowerCase());
            }
        },
        [slug],
    );

    const onChangeSlug = useCallback((e) => {
        const text = e.target.value;
        setSlug(text);
    }, []);

    const onChangeMarkdown = useCallback(
        (e) => {
            const newValue = e.target.value;
            setMarkdown(newValue);
            setHtml(markdownConverter.makeHtml(newValue));
            const { message } = Validator.checkMarkdown({ markdown: newValue });
            setMarkdownErrorMessage(message);
        },
        [markdownConverter],
    );

    const onChangeCoverImage = useCallback((e) => {
        const newValue = e.target.value;
        setCoverImage(newValue);

        if (!!newValue) {
            // 이미지 확인
        }
    }, []);

    const closeFileList = useCallback(() => {
        setFileListVisible(false);
    }, []);

    // const onTabKeyPressed = useCallback((e) => {
    //     e.preventDefault();
    //     const indent = `    `;
    //     const startIndex = e.target.selectionStart;
    //     const endIndex = e.target.selectionEnd;
    //     const text = e.target.value;
    //     setMarkdown(
    //         `${text.substring(0, startIndex)}${indent}${text.substring(
    //             endIndex,
    //         )} `,
    //     );
    // }, []);

    const onChangeCategories = useCallback((values, options) => {
        // console.log('selected values', values);
        // console.log('selected options', options);
        setSelectedCategories(
            options.map((v) => {
                return { name: v.props.value, slug: v.key };
            }),
        );
        setSelectedCategoryValues(values);

        const { message } = Validator.checkCategory({ categories: values });
        setCategoriesErrorMessage(message);
    }, []);

    const onChangeTags = useCallback((values, options) => {
        // console.log('selected values', values);
        // console.log('selected options', options);

        setSelectedTags(
            options.map((v) => {
                return {
                    name: v.props.value,
                    slug: v.key,
                };
            }),
        );
        setSelectedTagValues(values);
    }, []);

    const onClickShowFileListModal = useCallback(() => {
        setSelectFileTarget(SELECT_FILE_TARGET_COVERIMAGE);
        setFileListVisible(true);
    }, []);

    const onClickInsetImage = useCallback(() => {
        setSelectFileTarget(SELECT_FILE_TARGET_MARKDOWN);
        setFileListVisible(true);
    }, []);

    const onSelectMarkdownInsertImage = useCallback(
        (item) => {
            // todo 확인 필요 textAreaRef.refs.input <= HTMLTextAreaElement
            const textAreaRef = markdownRef.current;

            const startIndex = textAreaRef.selectionStart;
            const imageItem = `![${item.fileName}${item.fileExtension}](${item.src})\n`;
            const currentValue = textAreaRef.value;
            const newValue = `${currentValue.slice(
                0,
                startIndex,
            )}${imageItem}${currentValue.slice(startIndex)}`;

            setMarkdown(newValue);
            // setActiveKey('markdown');
            setFileListVisible(false);
            Modal.destroyAll();
        },
        [markdownRef],
    );

    const onSelectCoverImage = useCallback((item) => {
        setCoverImage(item.src);
        setFileListVisible(false);
        Modal.destroyAll();
    }, []);

    const onSelectItemOnFileList = useCallback(
        (item) => {
            switch (selectFileTarget) {
                case SELECT_FILE_TARGET_MARKDOWN:
                    onSelectMarkdownInsertImage(item);
                    break;

                case SELECT_FILE_TARGET_COVERIMAGE:
                    onSelectCoverImage(item);
                    break;

                default:
                    break;
            }
        },
        [onSelectCoverImage, onSelectMarkdownInsertImage, selectFileTarget],
    );

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();

            const formData = {
                title: title.trim(),
                slug: slug.trim(),
                markdown: markdown.trim(),
                categories: selectedCategories,
                tags: selectedTags,
                coverImage: (coverImage || '').trim(),
            };

            const { valid, messages } = Validator.validate(formData);
            if (valid) {
                if (!slug || slug.trim().length === 0) {
                    setSlug(title.replace(/\s+/g, '-').toLowerCase());
                }

                if (id) {
                    dispatch({
                        type: actionTypes.EDIT_POST_CALL,
                        id: id,
                        data: formData,
                    });
                } else {
                    dispatch({
                        type: actionTypes.WRITE_POST_CALL,
                        data: formData,
                    });
                }
            } else {
                ShowNotification({
                    title: '알림',
                    message: messages.join(' '),
                });
            }
        },
        [
            coverImage,
            dispatch,
            id,
            markdown,
            selectedCategories,
            selectedTags,
            slug,
            title,
        ],
    );

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Form.Item
                    label='Title'
                    hasFeedback={true}
                    help={titleErrorMessage}
                    validateStatus={!!titleErrorMessage ? 'error' : ''}>
                    <Input value={title} onChange={onChangeTitle} />
                </Form.Item>
                <Form.Item label='Slug'>
                    <Input value={slug} onChange={onChangeSlug} />
                </Form.Item>
                <Form.Item
                    label='Content'
                    hasFeedback={true}
                    help={markdownErrorMessage}
                    validateStatus={!!markdownErrorMessage ? 'error' : ''}>
                    <Tabs>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type='file-markdown' /> Markdown
                                </span>
                            }
                            key='markdown'>
                            <div>
                                <Button onClick={onClickInsetImage}>
                                    <Icon type='file-image' /> Insert image
                                </Button>
                            </div>
                            <ContentTextArea
                                ref={markdownRef}
                                value={markdown}
                                onChange={onChangeMarkdown}
                                placeholder={PLACEHOLDER_MARKDOWN}
                                rows={10}></ContentTextArea>
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type='eye' /> Preview
                                </span>
                            }
                            key='preview'>
                            <MarkdownPreview
                                source={markdown}
                                escapeHtml={false}
                            />
                        </Tabs.TabPane>
                        {/* <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="file-image" /> Media
                                </span>
                            }
                            key="media">
                            <div>
                                <FileList onSelect={onSelectImageFile} />
                            </div>
                        </Tabs.TabPane> */}
                    </Tabs>
                </Form.Item>
                <Form.Item label='Cover'>
                    <Input
                        value={coverImage}
                        onChange={onChangeCoverImage}
                        placeholder='Set post cover image'
                        addonBefore={
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={onClickShowFileListModal}>
                                <Icon type='picture' /> Select image
                            </span>
                        }
                    />
                </Form.Item>
                <Form.Item
                    label='Categories'
                    hasFeedback={true}
                    help={categoriesErrorMessage}
                    validateStatus={!!categoriesErrorMessage ? 'error' : ''}>
                    <Select
                        mode='multiple'
                        onChange={onChangeCategories}
                        style={{ width: '100%' }}
                        loading={loadingCategories}
                        value={selectedCategoryValues}>
                        {categories.map((c) => {
                            return (
                                <Select.Option key={c.slug} value={c.slug}>
                                    {c.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label='Tags'>
                    <Select
                        mode='tags'
                        onChange={onChangeTags}
                        style={{ width: '100%' }}
                        loading={loadingTags}
                        value={selectedTagValues}>
                        {tags.map((t) => {
                            return (
                                <Select.Option key={t.slug} value={t.slug}>
                                    {t.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Save
                    </Button>
                </Form.Item>
            </Form>

            <FullSizeModal
                title='Select a file'
                footer={false}
                visible={fileListVisible}
                maskClosable={true}
                onCancel={closeFileList}
                destroyOnClose={true}
                width='100%'>
                <FileList onSelect={onSelectItemOnFileList} />
            </FullSizeModal>
        </>
    );
};

export default WritePostForm;
