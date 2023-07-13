export const moneynumb =(money)=>{
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    return money.toLocaleString().replace(regex, ",");
}