import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { PatientEntity } from "../patient/patient.entity";

@Entity({ name: "history" })
export class HistoryEntity {
    @PrimaryGeneratedColumn()
    historyId: number | undefined;

    @Column({ type: "varchar", length: 200 })
    medicName!: string;

    @Column({ type: "varchar", length: 200 })
    paramedicName!: string;

    @Column({ type: "timestamp" })
    dateAttention!: Date;

    @Column({ type: "text" })
    symptoms!: string;

    @Column({ type: "text", nullable: true })
    observations: string | undefined;

    @Column({ type: "text", nullable: true })
    medicines: string | undefined;

    @Column({ type: "text" })
    diagnostic!: string;

    @ManyToOne(() => PatientEntity, patient => patient.patientId)
    @JoinColumn({ name: "patientId" })
    patient!: PatientEntity;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    updatedAt: Date | undefined;

    @Column({ type: "timestamp", nullable: true })
    deletedAt: Date | undefined;
}
