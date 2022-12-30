# nodeJS basic REST server  

this is a useful template of a nodejs basic REST server, you can use it whenever you want.

### Installation  

`npm install`  

### Usage  

`npm start`

### API REST Endpoints  

#### Get users(get)
`http://localhost:8080/api/usuarios?limit=<limitrecords>&offset=<offset>`  

#### Create users(post)
`http://localhost:8080/api/usuarios`

body : {  
    &emsp;name : {  
    &emsp;&emsp;type: String,  
    &emsp;&emsp;required: true  
    &emsp;},  
    &emsp;email : {  
    &emsp;&emsp;type: String,  
    &emsp;&emsp;required: true,  
    &emsp;&emsp;unique:true  
    &emsp;},  
    &emsp;password:{  
    &emsp;&emsp;type: String,  
    &emsp;&emsp;required: true  
    &emsp;},  
    &emsp;img : {  
    &emsp;&emsp;type: String  
    &emsp;},  
    &emsp;role : {  
    &emsp;&emsp;type: String,  
    &emsp;&emsp;required: true  
    &emsp;},  
    &emsp;status : {  
    &emsp;&emsp;type: Boolean,  
    &emsp;&emsp;default: true  
    &emsp;},  
    &emsp;google : {  
    &emsp;&emsp;type: Boolean,  
    &emsp;&emsp;required: false  
    &emsp;}  
}

#### Update users(put)
`http://localhost:8080/api/usuarios/<userid>`  

#### Delete users(delete)
`http://localhost:8080/api/usuarios/<userid>`