const bmiCalculator = (a: number, b: number): string => {
    let mass = a;
    let height = b/100;

    let result = (mass / (height ** 2));

    if (result < 25){
        return 'Normal (healthy weight)';
    } else if (result >= 25 && result <= 29) {
        return 'Overweight';
    } else if (result >= 30) {
        return 'Obese';
    }   
  }
  
  console.log(bmiCalculator(88.45, 198));