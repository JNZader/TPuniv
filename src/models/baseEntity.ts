import { IsBoolean, IsNumber, IsOptional, IsPositive } from "class-validator";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
    
    @PrimaryGeneratedColumn({ name: 'id' })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    id: number;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column({ name: 'estado', type: 'boolean' })
    @IsOptional()
    @IsBoolean()
    estado: Boolean=true;

}