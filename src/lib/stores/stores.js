import { readable, writable, derived } from 'svelte/store';
import AcademicSituationForm from '$lib/components/forms/AcademicSituationForm.svelte';
import EvaluationForm from '$lib/components/forms/EvaluationForm.svelte';
import EvaluationTypeForm from '$lib/components/forms/EvaluationTypeForm.svelte';
import StudentForm from '$lib/components/forms/StudentForm.svelte';
import StudentsGroupForm from '$lib/components/forms/StudentsGroupForm.svelte';
import SubjectForm from '$lib/components/forms/SubjectForm.svelte';
import UnenrollmentReasonForm from '$lib/components/forms/UnenrollmentReasonForm.svelte';
import YearForm from '$lib/components/forms/YearForm.svelte';
import UserForm from '$lib/components/forms/UserForm.svelte';
import RoleForm from '$lib/components/forms/RoleForm.svelte';
import { createLocalStorage, createSessionStorage, persist } from '@macfja/svelte-persistent-store';

export const loggedIn = persist(writable(false), createSessionStorage(), 'L');
export const view = persist(writable('/'), createLocalStorage(), 'V');
export const currentSchoolYear = writable('2022-2023');

//i18n
import translations from "../utils/translations";

export const locale = writable("es");
export const locales = Object.keys(translations);

function translate(locale, key, vars) {
	if (key && locale) {
		let text = '';

		if (locale === 'en') {
			text = translations[locale][key];

			if (!text) {
				text = key;
			}
			else {
				Object.keys(vars).map((k) => {
					const regex = new RegExp(`{{${k}}}`, "g");
					text = text.replace(regex, vars[k]);
				});
			}
		}
		else {
			text = key;
		}
		return text;
	}
}

export const t = derived(locale, ($locale) => (key, vars = {}) =>
	translate($locale, key, vars)
);

//tables
export const tables = readable([
	{
		name: 'Situaciones académicas',
		component: AcademicSituationForm,
		tableColumns: [{ label: 'Nombre', key: 'academic_situation_name' }]
	},
	{
		name: 'Evaluaciones',
		component: EvaluationForm,
		tableColumns: [
			{ label: 'Asignatura', key: 'subject_name' },
			{ label: 'Estudiante', key: 'student_name' },
			{ label: 'Nota', key: 'evaluation_numerical_value' },
			{ label: 'Fecha', key: 'evaluation_date' }
		]
	},
	{
		name: 'Tipos de evaluaciones',
		component: EvaluationTypeForm,
		tableColumns: [
			{ label: 'Nombre', key: 'evaluation_type_name' },
			{ label: 'Valor numérico', key: 'evaluation_numerical_value' }
		]
	},
	{
		name: 'Estudiantes',
		component: StudentForm,
		tableColumns: [
			{ label: 'Código', key: 'student_code' },
			{ label: 'Nombre', key: 'student_name' },
			{ label: 'Apellidos', key: 'lastname' },
			{ label: 'Sexo', key: 'sex' },
			{ label: 'Municipio', key: 'municipality' },
			{ label: 'Situación académica', key: 'academic_situation' },
			{ label: 'Causa de baja', key: 'unenrollment_reason' },
			{ label: 'Año académico', key: 'year' },
			{ label: 'Grupo', key: 'group_number' }
		]
	},
	{
		name: 'Grupos de estudiantes',
		component: StudentsGroupForm,
		tableColumns: [
			{ label: 'Año', key: 'year' },
			{ label: 'Número', key: 'group_number' }
		]
	},
	{
		name: 'Asignaturas',
		component: SubjectForm,
		tableColumns: [
			{ label: 'Nombre', key: 'subject_name' },
			{ label: 'Cantidad de horas planificadas', key: 'planned_hours' },
			{ label: 'Año', key: 'year' }
		]
	},
	{
		name: 'Causas de baja',
		component: UnenrollmentReasonForm,
		tableColumns: [{ label: 'Nombre', key: 'unenrollment_reason_name' }]
	},
	{
		name: 'Años',
		component: YearForm,
		tableColumns: [
			{ label: 'Año académico', key: 'year' },
			{ label: 'Curso escolar', key: 'school_year' }
		]
	},
	{
		name: 'Evaluaciones del estudiante',
		component: null,
		tableColumns: [
			{ label: 'Asignatura', key: 'subject_name' },
			{ label: 'Nota', key: 'evaluation_numerical_value' },
			{ label: 'Fecha', key: 'evaluation_date' }
		]
	},
	{
		name: 'Usuarios',
		component: UserForm,
		tableColumns: [
			{ label: 'Nombre de usuario', key: 'user_name' },
			{ label: 'Rol', key: 'role_name' },
			{ label: 'Identificador', key: 'code' }
		]
	},
	{
		name: 'Roles',
		component: RoleForm,
		tableColumns: [{ label: 'Nombre', key: 'role_name' }]
	},
	{
		name: 'Reporte 1',
		component: null,
		tableColumns: [
			{ label: 'Número de orden', key: 'order_number' },
			{ label: 'Nombre', key: 'student_name' },
			{ label: 'Apellidos', key: 'student_lastname' },
			{ label: 'Código', key: 'student_code' }
		]
	},
	{
		name: 'Reporte 2',
		component: null,
		tableColumns: [
			{ label: 'Nombre', key: 'subject_name' },
			{ label: 'Cantidad de horas planificadas', key: 'planned_hours' }
		]
	},
	{
		name: 'Reporte 3',
		component: null,
		tableColumns: [
			{ label: 'Número de orden', key: 'order_number' },
			{ label: 'Nombre', key: 'student_name' },
			{ label: 'Apellidos', key: 'student_lastname' },
			{ label: 'Evaluación', key: 'evaluation_type_name' }
		]
	},
	{
		name: 'Reporte 4',
		component: null,
		tableColumns: [
			{ label: 'Número de orden', key: 'student_order' },
			{ label: 'Nombre', key: 'student_name' },
			{ label: 'Apellidos', key: 'student_lastname' },
			{ label: 'Promedio', key: 'average' }
		]
	},
	{
		name: 'Reporte 5',
		component: null,
		tableColumns: [
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
		name: 'Reporte 6',
		component: null,
		tableColumns: [
			{ label: 'Asignatura', key: 'subject_name' },
			{ label: 'Calificación', key: 'grade' },
			{ label: 'Promedio', key: 'average' }
		]
	},
	{
		name: 'Reporte 7',
		component: null,
		tableColumns: [
			{ label: 'Número de orden', key: 'order_number' },
			{ label: 'Nombre', key: 'student_name' },
			{ label: 'Apellidos', key: 'lastname' },
			{ label: 'Asignaturas desaprobadas', key: 'failed_subjects' }
		]
	},
	{
		name: 'Reporte 8 por año',
		component: StudentForm,
		tableColumns: [
			{ label: 'Número de orden', key: 'order_number' },
			{ label: 'Nombre', key: 'student_name' },
			{ label: 'Apellidos', key: 'lastname' },
			{ label: 'Grupo', key: 'group_number' },
			{ label: 'Causa de baja', key: 'unenrollment_reason' }
		]
	},
	{
		name: 'Reporte 8 por grupo',
		component: StudentForm,
		tableColumns: [
			{ label: 'Número de orden', key: 'order_number' },
			{ label: 'Nombre', key: 'student_name' },
			{ label: 'Apellidos', key: 'lastname' },
			{ label: 'Causa de baja', key: 'unenrollment_reason' }
		]
	},
	{
		name: 'Reporte 9',
		component: null,
		tableColumns: [
			{ label: 'Número de orden', key: 'order_number' },
			{ label: 'Nombre', key: 'student_name' },
			{ label: 'Apellidos', key: 'lastname' },
			{ label: 'Grupo', key: 'student_group' }
		]
	}
]);
//pdf
export const pdfHeaders = readable([
	{
		reportName: 'Reporte 1',
		headers: {
			order_number: 'Número de orden',
			student_name: 'Nombre',
			student_lastname: 'Apellidos',
			student_code: 'Código',
			schoolYear: 'Curso escolar',
			year: 'Año académico',
			studentsGroup: 'Grupo'
		}
	},
	{
		reportName: 'Reporte 2',
		headers: {
			planned_hours: 'Horas planificadas',
			subject_name: 'Asignatura',
			schoolYear: 'Curso escolar',
			year: 'Año académico'
		}
	},
	{
		reportName: 'Reporte 3',
		headers: {
			order_number: 'Número de orden',
			student_name: 'Nombre',
			student_lastname: 'Apellidos',
			student_code: 'Código',
			schoolYear: 'Curso escolar',
			year: 'Año académico',
			studentsGroup: 'Grupo',
			evaluation_type_name: 'Calificación',
			subject: 'Asignatura'
		}
	},
	{
		reportName: 'Reporte 4',
		headers: {
			student_order: 'Número de orden',
			student_name: 'Nombre',
			student_lastname: 'Apellidos',
			average: 'Promedio',
			year: 'Año académico',
			groupNumber: 'Grupo'
		}
	},
	{
		reportName: 'Reporte 5',
		headers: {
			schoolYear: 'Curso escolar',
			municipality: 'Municipio',
			student_name: 'Nombre',
			lastname: 'Apellidos',
			order_number: 'Número de orden',
			average: 'Promedio',
			sex: 'Sexo',
			rank: 'Número de escalafón',
			year: 'Año académico',
			group_number: 'Grupo'
		}
	},
	{
		reportName: 'Reporte 6',
		headers: {
			school_year: 'Curso escolar',
			student_name: 'Nombre',
			student_lastname: 'Apellidos',
			average: 'Promedio',
			grade: 'Nota',
			year: 'Año académico',
			subject_name: 'Asignatura'
		}
	},
	{
		reportName: 'Reporte 7',
		headers: {
			schoolYear: 'Curso escolar',
			student_name: 'Nombre',
			lastname: 'Apellidos',
			order_number: 'Número de orden',
			group_number: 'Grupo',
			year: 'Año académico',
			failed_subjects: 'Asignatura desaprobada'
		}
	},
	{
		reportName: 'Reporte 8 por año',
		reportName2: 'Reporte 8 por grupo',
		headers: {
			schoolYear: 'Curso escolar',
			student_name: 'Nombre',
			lastname: 'Apellidos',
			order_number: 'Número de orden',
			studentsGroup: 'Grupo',
			group_number: 'Grupo',
			year: 'Año académico',
			unenrollment_reason: 'Causa de baja',
			student_id: 'Identificador'
		}
	},
	{
		reportName: 'Reporte 9',
		headers: {
			schoolYear: 'Curso escolar',
			student_name: 'Nombre',
			lastname: 'Apellidos',
			order_number: 'Número de orden',
			year: 'Año académico',
			student_group: 'Grupo'
		}
	}
]);




