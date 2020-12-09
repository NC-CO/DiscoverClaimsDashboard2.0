
export function multiplyBy4(value){
    if(value[0]==='$'){value = value.substring(1)}
    value = value.replace(new RegExp(',','g'),'');
    let floatVal = Number.parseFloat(value);
    floatVal = floatVal*4;
    let stringVal = floatVal.toString();
    stringVal = numberWithCommas(stringVal);
    return stringVal;
}
export function addRow(v1,v2,v3,v4){
    if(v1[0]==='$'){v1 = v1.substring(1)}
    v1 = v1.replace(new RegExp(',','g'),'');
    if(v2[0]==='$'){v2 = v2.substring(1)}
    v2 = v2.replace(new RegExp(',','g'),'');
    if(v3[0]==='$'){v3 = v3.substring(1)}
    v3 = v3.replace(new RegExp(',','g'),'');
    if(v4[0]==='$'){v4 = v4.substring(1)}
    v4 = v4.replace(new RegExp(',','g'),'');
    let f1 = Number.parseFloat(v1);
    let f2 = Number.parseFloat(v2);
    let f3 = Number.parseFloat(v3);
    let f4 = Number.parseFloat(v4);
    let sum = f1 + f2 + f3 + f4;
    let stringVal = sum.toString();
    stringVal = numberWithCommas(stringVal);
    return stringVal;
}
export function addTwo(v1,v2){
    if(v1[0]==='$'){v1 = v1.substring(1)}
    v1 = v1.replace(new RegExp(',','g'),'');
    if(v2[0]==='$'){v2 = v2.substring(1)}
    v2 = v2.replace(new RegExp(',','g'),'');
    let f1 = Number.parseFloat(v1);
    let f2 = Number.parseFloat(v2);
    let sum = f1 + f2;
    let stringVal = sum.toString();
    stringVal = numberWithCommas(stringVal);
    return stringVal;
}
export function divideBy4(v1){
    if(v1[0]==='$'){v1 = v1.substring(1)}
    v1 = v1.replace(new RegExp(',','g'),'');
    let f1 = Number.parseFloat(v1);
    let div = f1/4;
    let stringVal = div.toString();
    stringVal = numberWithCommas(stringVal);
    return stringVal;
}
export function divideBy(v1, v2){
    if(v1[0]==='$'){v1 = v1.substring(1)}
    v1 = v1.replace(new RegExp(',','g'),'');
    if(v2[0]==='$'){v2 = v2.substring(1)}
    v2 = v2.replace(new RegExp(',', 'g'), '');
    let f1 = Number.parseFloat(v1);
    let f2 = Number.parseFloat(v2);
    let div = f1/f2;
    div = div.toFixed(2);
    let stringVal = div.toString();
    stringVal = numberWithCommas(stringVal);
    return stringVal;
}
export function multiplywPer(v1, v2){
    if(v1[0]==='$'){v1 = v1.substring(1)}
    v1 = v1.replace(new RegExp(',','g'),'');
    if(v2[0]==='$'){v2 = v2.substring(1)}
    if(v2[v2.length-1]==='%'){v2 = v2.substring(0, v2.length - 1)}
    v2 = v2.replace('.', '');
    v2 = '.0' + v2;
    let f1 = Number.parseFloat(v1);
    let f2 = Number.parseFloat(v2);
    let mult = f1 * f2;
    mult = mult.toFixed(2);
    let stringVal = mult.toString();
    stringVal = numberWithCommasSm(stringVal);
    return stringVal;
}
export function multiplywPerBig(v1, v2){
    if(v1[0]==='$'){v1 = v1.substring(1)}
    v1 = v1.replace(new RegExp(',','g'),'');
    if(v2[0]==='$'){v2 = v2.substring(1)}
    if(v2[v2.length-1]==='%'){v2 = v2.substring(0, v2.length - 1)}
    v2 = v2.replace('.', '');
    v2 = '.' + v2;
    let f1 = Number.parseFloat(v1);
    let f2 = Number.parseFloat(v2);
    let mult = f1 * f2;
    mult = mult.toFixed(2);
    let stringVal = mult.toString();
    stringVal = numberWithCommasSm(stringVal);
    return stringVal;
}
export function multiply(v1, v2){
    if(v1[0]==='$'){v1 = v1.substring(1)}
    v1 = v1.replace(new RegExp(',','g'),'');
    if(v2[0]==='$'){v2 = v2.substring(1)}
    v2 = v2.replace(new RegExp(',','g'),'');
    let f1 = Number.parseFloat(v1);
    let f2 = Number.parseFloat(v2);
    let mult = f1 * f2;
    mult = mult.toFixed(2);
    let stringVal = mult.toString();
    stringVal = numberWithCommas(stringVal);
    return stringVal;
}
export function subtract(v1, v2){
    if(v1[0]==='$'){v1 = v1.substring(1)}
    v1 = v1.replace(new RegExp(',','g'),'');
    if(v2[0]==='$'){v2 = v2.substring(1)}
    v2 = v2.replace(new RegExp(',','g'),'');
    let f1 = Number.parseFloat(v1);
    let f2 = Number.parseFloat(v2);
    let sub = f1 - f2;
    sub = sub.toFixed(2);
    let stringVal = sub.toString();
    stringVal = numberWithCommasSm(stringVal);
    return stringVal;
}
export function numberWithCommas(x) {
    return '$' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function numberWithCommasSm(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function handleInputStr(v1){
    v1 = v1.trim();
    let arr = v1.split(' ');
    return arr;
}
export function handleOutputStr(v1){
    let arr = v1.split('|');
    let i;
    let finished = [];
    let count = 0;
    for (i=0; i<arr.length;i++){
        if(i !== 81 && i !== 84 && i !== 88 && i !== 91 && i !== 95 && i !== 97 && i !== 101
            && i !== 104 && i !== 106 && i !== 109 && i !== 111 && i !== 114 && i !== 116 && i !== 118
            && i !== 121 && i !== 125 && i !== 128 && i !== 132 && i !== 134 && i !== 138 && i !== 141
            && i !== 143 && i !== 146 && i !== 148 && i !== 151 && i !== 153 && i !== 170 && i !== 162 && i !== 161 && i !== 157
            && i !== 156){
            arr[i] = parseFloat(arr[i]);
            arr[i] = arr[i].toFixed(2);
            arr[i] = arr[i].toString();
            arr[i] = numberWithCommas(arr[i]);
            let tt = arr[i];
            tt = tt.slice(-2);
            if(tt === "00"){
                arr[i] = arr[i].substring(0, arr[i].length-3)
            }
        }
        if(i === 81 || i === 84 || i === 88 || i === 91 || i === 95 || i === 97 || i === 101 || i === 106
            || i === 111 || i === 118 || i === 121 || i === 125 || i === 128 || i === 132 || i === 134 ||
            i === 138 || i === 143 || i === 148 || i ===162 || i === 161 || i === 157 || i === 156){
            arr[i] = parseFloat(arr[i]);
            arr[i] = arr[i].toFixed(2);
            arr[i] = arr[i].toString();
            arr[i] = numberWithCommasSm(arr[i]);
            let ty = arr[i];
            ty = ty.slice(-2);
            if(ty === "00"){
                arr[i] = arr[i].substring(0, arr[i].length-3)
            }
        }
        if(i === 104 || i === 116 || i === 114 || i === 109 || i === 141 || i === 146 || i === 151 || i === 153 || i === 170){
            arr[i] = parseFloat(arr[i]);
            arr[i] = arr[i]*100;
            arr[i] = arr[i].toFixed(3);
            arr[i] = arr[i].toString();
            arr[i] = arr[i]+'%';
        }

    }
    return arr;
}
export function handleMetricsOutput(v1) {
    let count = 0;
    for (let i = 0; i < v1.length; i++){
        if (count === 0 || count === 3 || count === 7 || count === 10 || count === 12 || count === 14 || count === 17 || count === 19
            || count === 21 || count === 23 || count === 25 || count === 28 || count === 31 || count === 34 || count === 38 || count === 42
        ){
            let temp = commasHelper(v1[i].Actual, v1[i].Actual__1);
            v1[i].Actual = temp[0];
            v1[i].Actual__1 = temp[1];
        }
        if (count === 1 || count === 2 || count === 4 || count === 5 || count === 8 || count === 11 || count === 13 || count === 15
            || count === 18 || count === 20 || count === 22 || count === 26 || count === 27 || count === 29 || count === 30 || count === 32
            || count === 33 || count === 35 || count === 39 || count === 43){
            let temp = commasDollarHelper(v1[i].Actual, v1[i].Actual__1);
            v1[i].Actual = temp[0];
            v1[i].Actual__1 = temp[1];
        }
        if (count === 6 || count === 9 || count === 16 || count === 24 || count === 36 || count === 37 || count === 40 || count === 41
            || count === 44 || count === 45){
            let temp = percentHelper(v1[i].Actual, v1[i].Actual__1);
            v1[i].Actual = temp[0];
            v1[i].Actual__1 = temp[1];
        }
        count += 1;
    }

    return v1
}
function commasHelper(v1, v2){
    let tempFloat1 = parseFloat(v1);
    tempFloat1 = tempFloat1.toFixed(2);
    tempFloat1 = numberWithCommasSm(tempFloat1);
    tempFloat1 = tempFloat1.toString();
    let tt = tempFloat1;
    tt = tt.slice(-2);
    if(tt === "00"){
        tempFloat1 = tempFloat1.substring(0, tempFloat1.length-3)
    }
    v1 = tempFloat1;
    let tempFloat2 = parseFloat(v2);
    tempFloat2 = tempFloat2.toFixed(2);
    tempFloat2 = numberWithCommasSm(tempFloat2);
    tempFloat2 = tempFloat2.toString();
    let ttt = tempFloat2;
    ttt = ttt.slice(-2);
    if(ttt === "00"){
        tempFloat2 = tempFloat2.substring(0, tempFloat2.length-3)
    }
    v2 = tempFloat2;
    let ar = [];
    ar[0] = v1;
    ar[1] = v2;
    return ar;
}
function commasDollarHelper(v1, v2){
    let tempFloat1 = parseFloat(v1);
    tempFloat1 = tempFloat1.toFixed(2);
    tempFloat1 = numberWithCommas(tempFloat1);
    tempFloat1 = tempFloat1.toString();
    let tt = tempFloat1;
    tt = tt.slice(-2);
    if(tt === "00"){
        tempFloat1 = tempFloat1.substring(0, tempFloat1.length-3)
    }
    v1 = tempFloat1;
    let tempFloat2 = parseFloat(v2);
    tempFloat2 = tempFloat2.toFixed(2);
    tempFloat2 = numberWithCommas(tempFloat2);
    tempFloat2 = tempFloat2.toString();
    let ttt = tempFloat2;
    ttt = ttt.slice(-2);
    if(ttt === "00"){
        tempFloat2 = tempFloat2.substring(0, tempFloat2.length-3)
    }
    v2 = tempFloat2;
    let ar = [];
    ar[0] = v1;
    ar[1] = v2;
    return ar;
}
function percentHelper(v1, v2) {
    let tempFloat1 = parseFloat(v1);
    tempFloat1 = tempFloat1 * 100;
    tempFloat1 = tempFloat1.toFixed(3);
    tempFloat1 = tempFloat1.toString();
    tempFloat1 = tempFloat1 + '%';
    let tempFloat2 = parseFloat(v2);
    tempFloat2 = tempFloat2 * 100;
    tempFloat2 = tempFloat2.toFixed(3);
    tempFloat2 = tempFloat2.toString();
    tempFloat2 = tempFloat2 + '%';
    let ar = [];
    ar[0] = tempFloat1;
    ar[1] = tempFloat2;
    return ar;
}
export function handleStrFinal(v1){
    let j;
    let finished1 = []
    for (j in v1){
        finished1.push(j);
    }
    return finished1;
}
export function downloadFile(fileType, fileName, fileText) {
    let file = new Blob([fileText], {type: fileType});
    let a = document.createElement('a'),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}
