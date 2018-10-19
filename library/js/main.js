function setIdSale (element){
    if(element.checked){
        $('#id').val(element.value);
    }else{
        $('#id').val("");
    }
}