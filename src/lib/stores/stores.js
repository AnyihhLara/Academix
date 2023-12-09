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
            { label: 'Nombre', key: 'name' }]
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
            { label: 'Nombre', key: 'name' },
            { label: 'Valor numérico', key: 'numericalValue' }]
    },
    {
        name: 'Estudiantes', component: StudentForm, tableColumns: [
            { label: 'Código', key: 'code' }, { label: 'Nombre', key: 'name' },
            { label: 'Apellidos', key: 'lastname' },
            { label: 'Sexo', key: 'sex' }, { label: 'Municipio', key: 'municipality' },
            { label: 'Situación académica', key: 'academicSituation' },
            { label: 'Causa de baja', key: 'unenrollmentReason' },
            { label: 'Año académico', key: 'academicYear' },
            { label: 'Grupo', key: 'group' }]
    },
    {
        name: 'Grupos de estudiantes', component: StudentsGroupForm, tableColumns: [
            { label: 'Año', key: 'year' },
            { label: 'Número', key: 'number' }]
    },
    {
        name: 'Asignaturas', component: SubjectForm, tableColumns: [
            { label: 'Nombre', key: 'name' },
            { label: 'Cantidad de horas planificadas', key: 'plannedHours' },
            { label: 'Año', key: 'year' }]
    },
    {
        name: 'Causas de baja', component: UnenrollmentReasonForm, tableColumns: [
            { label: 'Nombre', key: 'name' }]
    },
    {
        name: 'Años', component: YearForm, tableColumns: [
            { label: 'Año académico', key: 'academicYear' },
            { label: 'Curso escolar', key: 'schoolYear' }]
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
]);