module.exports = {
    comparePassword: (data, password) => {
        let compareSrting =  [];
        for(let i = 0; i< data.length; i++){
            compareSrting.push(String.fromCharCode(data.charCodeAt(i)+10));
        }
        compareSrting = compareSrting.join("");
        return compareSrting === password;
    },
  };
  