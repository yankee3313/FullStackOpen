interface WorkoutStats {
    periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculator = (args: number[], target: number): WorkoutStats => {
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
}

console.log(calculator([3, 0, 2, 4.5, 0, 3, 1], 2))