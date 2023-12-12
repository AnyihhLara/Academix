import { readable, writable } from 'svelte/store';
import AcademicSituationForm from "$lib/components/forms/AcademicSituationForm.svelte";
import EvaluationForm from "$lib/components/forms/EvaluationForm.svelte";
import EvaluationTypeForm from "$lib/components/forms/EvaluationTypeForm.svelte";
import StudentForm from "$lib/components/forms/StudentForm.svelte";
import StudentsGroupForm from "$lib/components/forms/StudentsGroupForm.svelte";
import SubjectForm from "$lib/components/forms/SubjectForm.svelte";
import UnenrollmentReasonForm from "$lib/components/forms/UnenrollmentReasonForm.svelte";
import YearForm from "$lib/components/forms/YearForm.svelte";
import UserForm from "$lib/components/forms/UserForm.svelte";
import RoleForm from "$lib/components/forms/RoleForm.svelte"
import { createLocalStorage, createSessionStorage, persist } from '@macfja/svelte-persistent-store'

export const loggedUser = persist(
    writable({
        username: '',
        id_user: -1,
        role_name: '',
        id_role: -1,
    }),
    createSessionStorage(),
    'L'
);
export const view = persist(writable(''), createLocalStorage(), 'V');
export const popup = writable({ message: '', type: 'error' });
export const loading = writable(false)
export const tables = readable([
    {
        name: 'Situaciones académicas', component: AcademicSituationForm, tableColumns: [
            { label: 'Nombre', key: 'academic_situation_name' }]
    },
    {
        name: 'Evaluaciones', component: EvaluationForm, tableColumns: [
            { label: 'Asignatura', key: 'subject' },
            { label: 'Estudiante', key: 'student' },
            { label: 'Tipo', key: 'evaluationType' },
            { label: 'Fecha', key: 'evaluationDate' },
        ]
    },
    {
        name: 'Tipos de evaluaciones', component: EvaluationTypeForm, tableColumns: [
            { label: 'Nombre', key: 'evaluation_type_name' },
            { label: 'Valor numérico', key: 'evaluation_numerical_value' }]
    },
    {
        name: 'Estudiantes', component: StudentForm, tableColumns: [
            { label: 'Código', key: 'student_code' },
            { label: 'Nombre', key: 'student_name' },
            { label: 'Apellidos', key: 'lastname' },
            { label: 'Sexo', key: 'sex' },
            { label: 'Municipio', key: 'municipality' },
            { label: 'Situación académica', key: 'academic_situation' },
            { label: 'Causa de baja', key: 'unenrollment_reason' },
            { label: 'Año académico', key: 'year' },
            { label: 'Grupo', key: 'group_number' }]
    },
    {
        name: 'Grupos de estudiantes', component: StudentsGroupForm, tableColumns: [
            { label: 'Año', key: 'year' },
            { label: 'Número', key: 'group_number' }]
    },
    {
        name: 'Asignaturas', component: SubjectForm, tableColumns: [
            { label: 'Nombre', key: 'subject_name' },
            { label: 'Cantidad de horas planificadas', key: 'planned_hours' },
            { label: 'Año', key: 'year' }]
    },
    {
        name: 'Causas de baja', component: UnenrollmentReasonForm, tableColumns: [
            { label: 'Nombre', key: 'unenrollment_reason_name' }]
    },
    {
        name: 'Años', component: YearForm, tableColumns: [
            { label: 'Año académico', key: 'year' },
            { label: 'Curso escolar', key: 'school_year' }]
    },
    {
        name: 'Evaluaciones del estudiante', component: null, tableColumns: [
            { label: 'Asignatura', key: 'subject' },
            { label: 'Tipo', key: 'evaluationType' },
            { label: 'Fecha', key: 'evaluationDate' }]
    },
    {
        name: 'Usuarios', component: UserForm, tableColumns: [
            { label: 'Nombre de usuario', key: 'username' },
            { label: 'Contraseña', key: 'password' },
            { label: 'Rol', key: 'role' }]
    },
    {
        name: 'Roles', component: RoleForm, tableColumns: [
            { label: 'Nombre', key: 'name' }]
    },
    {
        name: 'Reporte 1', component: null, tableColumns: [
            { label: 'Número de orden', key: 'order_number' },
            { label: 'Nombre', key: 'student_name' },
            { label: 'Apellidos', key: 'lastname' },
            { label: 'Código', key: 'student_code' }]
    },
    {
        name: 'Reporte 2', component: null, tableColumns: [
            { label: 'Nombre', key: 'name' },
            { label: 'Cantidad de horas planificadas', key: 'plannedHours' }]
    },
    {
        name: 'Reporte 3', component: null, tableColumns: [
            { label: 'Número de orden', key: 'order_number' },
            { label: 'Nombre', key: 'student_name' },
            { label: 'Apellidos', key: 'lastname' },
            { label: 'Evaluación', key: 'evaluation' }]
    },
    {
        name: 'Reporte 4', component: null, tableColumns: [
            { label: 'Número de orden', key: 'order_number' },
            { label: 'Nombre', key: 'student_name' },
            { label: 'Apellidos', key: 'lastname' },
            { label: 'Promedio', key: 'average' }
        ]
    },
    {
        name: 'Reporte 5', component: null, tableColumns: [
            { label: 'Número de escalafón', key: 'rank' },
            { label: 'Nombre', key: 'student_name' },
            { label: 'Apellidos', key: 'lastname' },
            { label: 'Promedio', key: 'average' },
            { label: 'Número de orden', key: 'order_number' },
            { label: 'Sexo', key: 'sex' },
            { label: 'Municipio', key: 'municipality' }
        ]
    },
    {
        name: 'Reporte 6', component: null, tableColumns: [
            { label: 'Asignatura', key: 'subject' },
            { label: 'Calificación', key: 'grade' },
            { label: 'Promedio', key: 'average' },
        ]
    },
    {
        name: 'Reporte 7', component: null, tableColumns: [
            { label: 'Número de orden', key: 'order_number' },
            { label: 'Nombre', key: 'student_name' },
            { label: 'Apellidos', key: 'lastname' },
            { label: 'Asignaturas desaprobadas', key: 'failed_subjects' }
        ]
    },
    {
        name: 'Reporte 8 por año', component: null, tableColumns: [
            { label: 'Número de orden', key: 'order_number' },
            { label: 'Nombre', key: 'student_name' },
            { label: 'Apellidos', key: 'lastname' },
            { label: 'Grupo', key: 'students_group' },
            { label: 'Causa de baja', key: 'unenrollment_reason' },
        ]
    },
    {
        name: 'Reporte 8 por grupo', component: null, tableColumns: [
            { label: 'Número de orden', key: 'order_number' },
            { label: 'Nombre', key: 'student_name' },
            { label: 'Apellidos', key: 'lastname' },
            { label: 'Causa de baja', key: 'unenrollment_reason' },
        ]
    },
    {
        name: 'Reporte 9', component: null, tableColumns: [
            { label: 'Número de orden', key: 'order_number' },
            { label: 'Nombre', key: 'student_name' },
            { label: 'Apellidos', key: 'lastname' },
            { label: 'Grupo', key: 'students_group' }
        ]
    }
]);