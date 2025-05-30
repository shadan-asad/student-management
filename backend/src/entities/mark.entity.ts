import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from './student.entity';
import { Subject } from './subject.entity';

@Entity('mark')
export class Mark {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'student_id' })
  studentId: string;

  @Column({ name: 'subject_id' })
  subjectId: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  score: number;

  @Column()
  semester: number;

  @Column({ name: 'academic_year' })
  academicYear: string;

  @ManyToOne(() => Student, student => student.marks)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Subject, subject => subject.marks)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 