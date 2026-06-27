export type StudentSummary = {
  id: string;
  name: string;
};

export type ClassSession = {
  id: string;
  title: string;
  startsAt: string;
  location: string;
};

export type StudentMaterial = {
  id: string;
  title: string;
  accessUrl: string;
};

// No futuro, o backend implementará este contrato sem alterar a interface.
export interface StudentPortalRepository {
  getStudent(studentId: string): Promise<StudentSummary | null>;
  getUpcomingSessions(studentId: string): Promise<ClassSession[]>;
  getMaterials(studentId: string): Promise<StudentMaterial[]>;
}
