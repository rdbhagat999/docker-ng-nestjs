import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";
import {Permission} from "../permission/permission";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Permission, { cascade: true })
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {name: 'roleId', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'permissionId', referencedColumnName: 'id'}
    })
    permissions: Permission[]
}
