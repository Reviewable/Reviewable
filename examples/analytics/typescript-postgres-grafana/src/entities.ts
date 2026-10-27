import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ type: "text" })
  userId: string;

  @Column({ type: "text", nullable: true })
  avatar: string;

  @Column({ type: "text", nullable: true })
  email: string;

  @Column({ type: "text", nullable: true })
  name: string;

  @Column({ type: "text", nullable: true })
  username: string;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "text", nullable: true, unique: true })
  eventId: string | null | undefined;

  @Column({ type: "timestamp" })
  sentAt: Date;

  @Column({ type: "text" })
  event: string;

  @Column({ type: "text", nullable: true })
  anonymousId: string | null | undefined;

  @Column({ type: "text", nullable: true })
  userAgent: string | null | undefined;

  @Column({ type: "bool" })
  active: boolean;

  @Column({ type: "text", nullable: true })
  agent: string | null | undefined;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn()
  user: User;

  @Column({ type: "jsonb" })
  properties: any;
}

