import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from './post.entity';
@Entity('afsan')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 150 })
  fullname: string;


  @Column({ default: false })
  isActive: boolean;

  @Column({ length: 255 })
  password: string; 
 // One-to-One relationship with Profile
  @OneToOne(() => Profile, profile => profile.admin, { cascade: true })
  @JoinColumn()
  profile: Profile;

  // One-to-Many relationship with Post
  @OneToMany(() => Post, post => post.admin, { cascade: true })
  posts: Post[];
 
}
