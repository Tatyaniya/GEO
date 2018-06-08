// дата в нужном формате
function dateWrite() {
    var date = new Date();

    var day = date.getDate();

    if (day < 10) day = '0' + day;

    var month = date.getMonth() + 1;

    if (month < 10) month = '0' + month;

    var year = date.getFullYear();
    
    var d = day + '.' + month + '.' + year;
   
    return d;
}

export {
    dateWrite
}
