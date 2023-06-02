const bmiCalculator = (weight: number, height: number): string => {

    let bmi = (weight / ((height/100) ** 2));

    if (bmi < 25){
        return 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi <= 29) {
        return 'Overweight';
    } else if (bmi >= 30) {
        return 'Obese';
    } else {
        throw new Error('Unexpected BMI calculation');
      }
  }

  export default bmiCalculator;