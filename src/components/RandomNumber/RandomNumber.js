const randomNumber = () => {
	var digits = "0123456789";
	let number = "";
	for (let i = 0; i < 4; i++) {
		number += digits[Math.floor(Math.random() * 10)];
	}
	return number;
};

export default randomNumber;
