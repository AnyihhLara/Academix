import { readable, writable} from 'svelte/store';

//test
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
    { name: 'Situaciones académicas', createComponent: CreateAcademicSituation, updateComponent: UpdateAcademicSituation, tableColumns: [{ label: 'Nombre', key: 'name' }] },
    { name: 'Evaluaciones', createComponent: CreateEvaluation, updateComponent: UpdateEvaluation, tableColumns: [{ label: 'Tipo', key: 'evaluationType' }, { label: 'Estudiante', key: 'student' }, { label: 'Asignatura', key: 'subject' }, { label: 'Fecha', key: 'evaluationDate' }] },
    { name: 'Tipos de evaluaciones', createComponent: CreateEvaluationType, updateComponent: UpdateEvaluationType, tableColumns: [{ label: 'Nombre', key: 'name' }, { label: 'Valor numérico', key: 'numericalValue' }] },
    { name: 'Estudiantes', createComponent: CreateStudent, updateComponent: UpdateStudent, tableColumns: [{ label: 'Código', key: 'code' }, { label: 'Nombre', key: 'name' }, { label: 'Apellidos', key: 'lastname' }, { label: 'Sexo', key: 'sex' }, { label: 'Municipio', key: 'municipality' }, { label: 'Situación académica', key: 'academicSituation' }, { label: 'Causa de baja', key: 'unenrollmentReason' }, { label: 'Año', key: 'year' }, { label: 'Grupo', key: 'group' }] },
    { name: 'Grupos de estudiantes', createComponent: CreateStudentsGroup, updateComponent: UpdateStudentsGroup, tableColumns: [{ label: 'Año', key: 'year' }, { label: 'Número', key: 'number' }] },
    { name: 'Asignaturas', createComponent: CreateSubject, updateComponent: UpdateSubject, tableColumns: [{ label: 'Nombre', key: 'name' }, { label: 'Cantidad de horas planificadas', key: 'plannedHours' }, { label: 'Año', key: 'year' }] },
    { name: 'Causa de baja', createComponent: CreateUnenrollmentReason, updateComponent: UpdateUnenrollmentReason, tableColumns: [{ label: 'Nombre', key: 'name' }] },
    { name: 'Años', createComponent: CreateYear, updateComponent: UpdateYear, tableColumns: [{ label: 'Año', key: 'year' }, { label: 'Curso escolar', key: 'schoolYear' }] },
]);

// export const popup = writable({message: '', type: 'error'});
// export const loading = writable(false)
