import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

// 쿠키 얻고 장고로 csrf 보내는 부분 함수화시킬 것
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
const HEADER = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
    }
}

export default {
    HEADER
}