function fizzbuzz(i){
    result = ''
    while (i%3){
        result += "fizz"
        break;
    }
    while (i%5){
        result += "buzz"
        break;
    }
    return result;
}
for(i = 0; i<5; i++){
    console.log(fizzbuzz(i));
}