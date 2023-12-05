import { readable } from 'svelte/store';
import CreateAcademicSituation from "$lib/components/forms/academic_situation/CreateAcademicSituation.svelte";
import UpdateAcademicSituation from "$lib/components/forms/academic_situation/UpdateAcademicSituation.svelte";
import CreateEvaluation from "$lib/components/forms/evaluation/CreateEvaluation.svelte";
import UpdateEvaluation from "$lib/components/forms/evaluation/UpdateEvaluation.svelte";
import CreateEvaluationType from "$lib/components/forms/evaluation_type/CreateEvaluationType.svelte";
import UpdateEvaluationType from "$lib/components/forms/evaluation_type/UpdateEvaluationType.svelte";
import CreateStudent from "$lib/components/forms/student/CreateStudent.svelte";
import UpdateStudent from "$lib/components/forms/student/UpdateStudent.svelte";
import CreateStudentsGroup from "$lib/components/forms/students_group/CreateStudentsGroup.svelte";
import UpdateStudentsGroup from "$lib/components/forms/students_group/UpdateStudentsGroup.svelte";
import CreateSubject from "$lib/components/forms/subject/CreateSubject.svelte";
import UpdateSubject from "$lib/components/forms/subject/UpdateSubject.svelte";
import CreateUnenrollmentReason from "$lib/components/forms/unenrollment_reason/CreateUnenrollmentReason.svelte";
import UpdateUnenrollmentReason from "$lib/components/forms/unenrollment_reason/UpdateUnenrollmentReason.svelte";
import CreateYear from "$lib/components/forms/year/CreateYear.svelte";
import UpdateYear from "$lib/components/forms/year/UpdateYear.svelte";

export const tables = readable([
    { name: 'situación académica', createComponent: CreateAcademicSituation, updateComponent: UpdateAcademicSituation, columnsTable: [{ label: 'Nombre', key: 'name' }] },
    { name: 'evaluación', createComponent: CreateEvaluation, updateComponent: UpdateEvaluation, columnsTable: [{ label: 'Tipo', key: 'evaluationType' }, { label: 'Estudiante', key: 'student' }, { label: 'Asignatura', key: 'subject' }, { label: 'Fecha', key: 'evaluationDate' }] },
    { name: 'tipo de evaluación', createComponent: CreateEvaluationType, updateComponent: UpdateEvaluationType, columnsTable: [{ label: 'Nombre', key: 'name' }, { label: 'Valor numérico', key: 'numericalValue' }] },
    { name: 'estudiante', createComponent: CreateStudent, updateComponent: UpdateStudent, columnsTable: [{ label: 'Código', key: 'code' }, { label: 'Nombre', key: 'name' }, { label: 'Apellidos', key: 'lastname' }, { label: 'Sexo', key: 'sex' }, { label: 'Municipio', key: 'municipality' }, { label: 'Situación académica', key: 'academicSituation' }, { label: 'Causa de baja', key: 'unenrollmentReason' }, { label: 'Año', key: 'year' }, { label: 'Grupo', key: 'group' }] },
    { name: 'grupo de estudiantes', createComponent: CreateStudentsGroup, updateComponent: UpdateStudentsGroup, columnsTable: [{ label: 'Año', key: 'year' }, { label: 'Número', key: 'number' }] },
    { name: 'asignatura', createComponent: CreateSubject, updateComponent: UpdateSubject, columnsTable: [{ label: 'Nombre', key: 'name' }, { label: 'Cantidad de horas planificadas', key: 'plannedHours' }, { label: 'Año', key: 'year' }] },
    { name: 'causa de baja', createComponent: CreateUnenrollmentReason, updateComponent: UpdateUnenrollmentReason, columnsTable: [{ label: 'Nombre', key: 'name' }] },
    { name: 'año', createComponent: CreateYear, updateComponent: UpdateYear, columnsTable: [{ label: 'Año', key: 'year' }, { label: 'Curso escolar', key: 'schoolYear' }] },
]);

// export const popup = writable({message: '', type: 'error'});
// export const loading = writable(false)
