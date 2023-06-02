const bmiCalculator = (a: number, b: number): string => {
    let mass = a;
    let height = b/100;

    let result = (mass / (height ** 2));
    let message = '';

    if (result < 25){
        return 'Normal (healthy weight)';
    } else if (result >= 25 && result <= 29) {
        return 'Overweight';
    } else if (result >= 30) {
        return 'Obese';
    }   
  }
  
const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);

const bmiResult: string = bmiCalculator(a, b);

try {
    console.log(bmiResult);
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }