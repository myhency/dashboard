const isNotCorrectID = (inputString) => {
    if (inputString.match(/^[@.+=\-_\w\d]{1,30}$/) === null) {
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

const noExponents = (input) =>{
    var data= String(input).split(/[eE]/);
<<<<<<< HEAD
    if(data.length === 1) return data[0]; 
=======
    if(data.length== 1) return data[0]; 
>>>>>>> jamestest

    var  z= '', sign= input<0? '-':'',
    str= data[0].replace('.', ''),
    mag= Number(data[1])+ 1;

    if(mag<0){
        z= sign + '0.';
        while(mag++) z += '0';
<<<<<<< HEAD
        return z + str.replace(/^-/,'');
=======
        return z + str.replace(/^\-/,'');
>>>>>>> jamestest
    }
    mag -= str.length;  
    while(mag--) z += '0';
    return str + z;
}


export default {
    isNotCorrectID,
    isEmpty,
    isNotMatchPassword,
    noExponents,
}