import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadingStart, loadingStop } from 'store/modules/loading';

import { Button } from 'reactstrap';
import { IoMdContact } from 'react-icons/io';
import ReactQuill from 'react-quill';
import ContentCard from 'components/ContentCard';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import Fetch from 'utils/Fetch';

import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

class NoticeDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notice: {
                notice_id: '',
                notice_title: '',
                notice_content: '',
                notice_author: '',
                notice_reg_date: '',
                notice_mod_date: ''
            }
        }
    }

    componentDidMount() {
        console.log(this.props.match);
        const url = `/notices/${this.props.match.params.noticeId}`;
        
        this.props.dispatch(loadingStart())
        .then(() => {    
            Fetch.GET(url)
            .then((res) => {
                this.setState({
                    notice: res
                });
            })
            .catch((error) => {
                alert('Error');
                this.props.history.push('/main/pages/noticeList');
            })
            .finally(() => {
                this.props.dispatch(loadingStop());
            })
        })

    }

    onClickGoNoticeListButton = () => {
        this.props.history.push('/main/pages/noticeList');
    }

    onClickDeleteButton = () => {
        var params= {}

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
        
        let url = `/notices/${this.state.notice.notice_id}/`;

        Fetch.DELETE(url, params, django)
            .then((res) => {
                console.log('delete success');
                this.props.history.push('/main/pages/noticeList');
            })
            .catch((error) => {
                alert('Error');
            })
            .finally(() => {
                this.props.dispatch(loadingStop());
            })
    }

    render() {
        const { notice } = this.state;
        return (
            <Fragment>
                <ContentCard>
                    <ContentRow>
                        <ContentCol wrap style={{paddingRight:0}}>
                            <IoMdContact color="#0070d9" size={50}/>
                        </ContentCol>
                        <ContentCol>
                            <span style={{color:'black'}}>{notice.notice_author}</span><br/>
                            <span style={{color:'rgba(0,0,0,.54)'}}>{notice.notice_reg_date}</span>
                        </ContentCol>
                    </ContentRow>
                    <ContentRow>
                        <ContentCol>
                            <span style={{color:'black', fontSize:'2rem', fontWeight:'500'}} >
                                {notice.notice_title}
                            </span>
                        </ContentCol>
                    </ContentRow>
                    <ReactQuill
                        style={{
                            border:'1px solid rgba(0,0,0,.125)'
                        }}
                        theme='bubble'
                        readOnly
                        value={notice.notice_content}
                    />
                </ContentCard>
                <ContentRow>
                    <ContentCol>
                        <Button outline color="secondary" onClick={this.onClickGoNoticeListButton}>목록</Button>{' '}
                        <Button color="primary">수정</Button>{' '}
                        <Button color="danger" onClick={this.onClickDeleteButton}>삭제</Button>
                    </ContentCol>
                </ContentRow>
            </Fragment>
        );
    }
}

export default connect(null)(withRouter(NoticeDetail));