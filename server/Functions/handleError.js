const handleErrors = (err)=>{
    const errorMessage = {name:'',email:'',password:''};

    // console.log(err.message, err.code);
    // console.log(err);
    if(err.message === 'Email already in exits')   errorMessage['email'] = 'Email already exits';
    // validations errors 
    if(err.message.includes("user validation failed")){

        // the error information is stored in err.errors for each error which 
        // is also a object that contains a properties object which contain a message 

        // console.log(err.errors.name.properties);
        Object.values(err.errors).forEach((e)=>{
            // console.log(e.properties);
            // console.log('\nnext\n');
            errorMessage[e.properties.path]=e.properties.message;
        })
    }
    if(err.code === 11000){
        errorMessage['email']='Email already in use';
    }

    // Login Errors
    if(err.message === 'Incorrect Password')    errorMessage['password'] = 'Incorrect Password';
    if(err.message === 'Enter an email') errorMessage['email']='Enter an email';
    if(err.message === 'Enter a password') errorMessage['password'] = 'Enter a password';
    if(err.message === 'Email not found')   errorMessage['email'] = 'Email not found';
    if(err.message === 'Email is not valid')   errorMessage['email'] = 'Email is not valid';



    return errorMessage;
}


module.exports = {handleErrors};