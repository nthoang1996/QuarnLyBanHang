module.exports = {
    sumAllPromotion: (data) => {
        let result = 0;
        console.log(data);
        data.forEach(element => {
            result+= element.KHUYENMAI;
        });
        return result;
    },
  };
  