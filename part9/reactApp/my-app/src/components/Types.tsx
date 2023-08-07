export interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
export interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  kind: "group";
  groupProjectCount: number;
}

export interface CoursePartBackground extends CoursePartBase {
  kind: "background";
  backgroundMaterial: string;
  description: string;
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;
