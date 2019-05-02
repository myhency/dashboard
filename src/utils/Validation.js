const isNotCorrectID = (inputString) => {
    if (inputString.match(/^[\@\.\+\=\-\_\w\d]{1,30}$/) === null) {
        // not correct case
        return true;
    } else {
        // correct case
        return false;
    }
}

const isEmpty = (inputString) => {
    if (inputString === "") {
        return true;
    } else {
        return false;
    }
}

const isNotMatchPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return true;
    } else {
        return false;
    }
}


export default {
    isNotCorrectID,
    isEmpty,
    isNotMatchPassword,
}