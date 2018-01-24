const jwt = require('jsonwebtoken');

module.exports = {
	getToken: (account) => {
		// 为方便测试，有效期设置为 10s 进行监测，普通生产情况下可以设置为更长的时间
		const token = jwt.sign({
			account: account
		}, 'ywork', {
			expiresIn: '0.5h'
		});
		return token;
	},
	checkToken: (token) => {
        let bool = true;
        if(token){
            let decoded = jwt.decode(token, 'ywork');
			console.log(decoded);
            if (decoded.exp <= Date.now() / 1000 || !decoded.account) {
                bool = false;
    		}
        }else{
            bool = false;
        }
        return bool;
	}
}
