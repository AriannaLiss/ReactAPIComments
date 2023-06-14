export const validation = (resp1, resp2, errorHandler) => {   
    let val = true; 
    console.log('resp1',resp1);    
    console.log('resp2',resp2);    
    if ((resp1.id!=resp2.id)||(resp1.body!=resp2.body)||(resp1.name!=resp2.name)) {
        errorHandler('validation error');
        val = false;
    }
    return val;
}