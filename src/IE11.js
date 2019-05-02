/*
    IE11에서 지원하지 않는 method들을 재정의..
*/

// foreach
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}