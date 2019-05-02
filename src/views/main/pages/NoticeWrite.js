import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadingStart, loadingStop } from 'store/modules/loading';

import ReactQuill from 'react-quill';
import { Label, Input, Button, FormText, FormFeedback } from 'reactstrap';
import ContentCard from 'components/ContentCard';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import Fetch from 'utils/Fetch';

// react 내에서 jquery 사용하느라 삽입
// 작동은 하는데 올바른 방법인지는 모름.
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

class NoticeWrite extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            content: '',
            isInvalidTitle: false,
            isInvalidAuthor: false,
            isInvalidContent: false
        };
    }

    modules = {
        // http://quilljs.com/docs/formats/
        toolbar: {
            container: [
                [{ 'size': [ 'small', false, 'large', 'huge' ]}],
                [{ 'align': [] }, 'bold', 'italic', 'underline', { color: []}],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['code-block', 'link', 'image'],
                ['clean']
            ],
        }
    };

    onChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    onChangeAuthor = (event) => {
        this.setState({
            author: event.target.value
        })
    }
    
    onChangeContent = (value) => {
        this.setState({
            content: value
        })
    }

    onClickWriteButton = () => {
        const { title, author, content } = this.state;
        let isInvalidTitle = false, isInvalidAuthor = false, isInvalidContent = false;

        if(title === '') {
            isInvalidTitle = true;
        }

        if(author === '') {
            isInvalidAuthor = true;
        }

        if(content === '') {
            isInvalidContent = true;
        }

        this.setState({
            isInvalidTitle,
            isInvalidAuthor,
            isInvalidContent
        });

        if(isInvalidTitle || isInvalidAuthor || isInvalidContent) {
            return;
        }

        const url = '/notices/';
        const params = {
            notice_title: title,
            notice_author: author,
            notice_content: content,
        };

        let noticeId;

        // csrf 생성을 위한 장고 cookie 얻기
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        // 쿠키로부터 csrf 토큰 값 추출 
        var csrftoken = getCookie('csrftoken');

        // fetch post 옵션으로 보낼 dict 생성
        // API 보낼 때 헤더 생략되면 MIME타입으로 요청 -> 응답 불가
        const django = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            }
        }
                
        this.props.dispatch(loadingStart())
        .then(() => {
            // post에 param 전달
            Fetch.POST(url, params, django)
            .then(res => {
                console.log(res);
                noticeId = res.notice_id;
            })
            .catch(error => {
                alert(error);
            })
            .finally(() => {
                this.props.dispatch(loadingStop());
                if(noticeId !== undefined) {
                    this.props.history.push(`/main/pages/notice/${noticeId}`);
                }
            })
        })
    }

    onClickGoBackButton = () => {
        this.props.history.push('/main/pages/noticeList');
    }
    
    render() {
        const { isInvalidTitle, isInvalidAuthor, isInvalidContent, content } = this.state;
        return (
            <Fragment>
                <ContentCard>
                    <ContentRow>
                        <ContentCol>
                            <Label for="inputTitle">
                                Title<span style={{color:'red'}}> *</span>
                            </Label>
                            <Input 
                                id="inputTitle" 
                                invalid={isInvalidTitle}
                                placeholder="Enter Title" 
                                onChange={this.onChangeTitle}
                            />
                            <FormFeedback invalid={"true"}>Title is required.</FormFeedback>
                        </ContentCol>
                    </ContentRow>
                    <ContentRow>
                        <ContentCol>
                            <Label for="inputAuthor">
                                Author<span style={{color:'red'}}> *</span>
                            </Label>
                            <Input 
                                id="inputAuthor" 
                                invalid={isInvalidAuthor}
                                placeholder="Enter Author" 
                                onChange={this.onChangeAuthor}
                            />
                            <FormFeedback invalid={"true"}>Author is required.</FormFeedback>
                        </ContentCol>
                    </ContentRow>
                    <ContentRow>
                        <ContentCol md={6}>
                            <Label for="exampleCity">City</Label>
                            <Input type="text" name="city" id="exampleCity"/>
                        </ContentCol>
                        <ContentCol md={4}>
                            <Label for="exampleState">State</Label>
                            <Input type="text" name="state" id="exampleState"/>
                        </ContentCol>
                        <ContentCol md={2}>
                            <Label for="exampleZip">Zip</Label>
                            <Input type="text" name="zip" id="exampleZip"/>
                        </ContentCol>
                    </ContentRow>
                    <ContentRow>
                        <ContentCol style={{paddingLeft:'2.25rem'}}>
                            <Input type="checkbox" name="check" id="exampleCheck"/>
                            <Label for="exampleCheck">Check me out</Label>
                        </ContentCol>
                    </ContentRow>
                    <ContentRow>
                        <ContentCol>
                            <Label>
                                Content<span style={{color:'red'}}> *</span>
                            </Label>
                            <ReactQuill
                                value={content} 
                                onChange={this.onChangeContent} 
                                modules={this.modules}
                                placeholder='Enter Content...'
                                bounds={'#innerContent'}
                                invalid={isInvalidContent}
                            />
                        </ContentCol>
                    </ContentRow>
                    <ContentRow>
                        <ContentCol md={1}>
                            <Label for="exampleFile">
                                File
                            </Label>
                        </ContentCol>
                        <ContentCol>
                            <Input type="file" name="file" id="exampleFile" />
                            <FormText color="muted">
                                This is some placeholder block-level help text for the above input.
                                It's a bit lighter and easily wraps to a new line.
                            </FormText>
                        </ContentCol>
                    </ContentRow>
                    <ContentRow>
                        <ContentCol>
                            <Button color="primary" onClick={this.onClickWriteButton}>저장</Button>&nbsp;
                            <Button outline color="secondary" onClick={this.onClickGoBackButton}>목록</Button>
                        </ContentCol>
                    </ContentRow> 
                </ContentCard>
            </Fragment>
        );
    }
}

export default connect(null)(withRouter(NoticeWrite));