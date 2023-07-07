interface WorkoutStats {
    periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculator = (target: number, args: number[]): WorkoutStats => {
  const periodLength: number = args.length;
  const trainingDays: number = args.reduce((acc, curr) => {
    if (curr > 0){
        return acc +1;
    } else {
        return acc;
    }
  }, 0);
  const total: number = args.reduce((acc, curr) => acc + curr, 0);
  const average: number = total/args.length;
  const success: boolean = average >= target;
  let rating: number;
  if (average >= target) {
    rating = 3;
  } else if (average >= target - 1) {
    rating = 2;
  } else {
    rating = 1;
  }
  let ratingDescription: string;
  if (rating ===3) {
    ratingDescription = 'excellent job';
  } else if (rating === 2){
    ratingDescription = 'nice try but you can do better';
  } else if (rating === 1) {
    ratingDescription = ' you ned to hit the gym more, Tubby';
  } else {
    ratingDescription = 'Unknown rating';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const target = Number(process.argv[2]);
const args: number[] = process.argv.slice(3).map(Number);

const result: WorkoutStats = calculator(target, args);

try {
    console.log(result);
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }