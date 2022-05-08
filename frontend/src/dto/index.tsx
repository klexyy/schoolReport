export type ScheduleDTO = {
  id: number;
  classroom_id: number;
  subject_id: number;
  date: string;
  start_time: string;
  end_time: string;
};

export type ClassroomDTO = {
  id: number;
  name: string;
};

export type SubjectDTO = {
  id: number;
  name: string;
};
export type ScheduleAssignationDTO = {
  id: number;
  schedule_id: number;
  group_id: number;
};

export type GroupDTO = {
  id: number;
  name: string;
};

export type CreateLessonDTO = {
  group_id?: string;
  classroom_id?: number;
  subject_id?: number;
  date?: string;
  start_time?: string;
  end_time?: string;
};


export type DatePaginationDTO = {
  dayName: string
  date: string
}