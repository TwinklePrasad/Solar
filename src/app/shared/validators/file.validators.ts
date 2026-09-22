import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

export function resumeFileValidator(maxBytes = 5 * 1024 * 1024): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File | null;
    if (!file) {
      return { required: true };
    }

    const name = file.name.toLowerCase();
    const hasAllowedExtension = ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext));
    const hasAllowedType = !file.type || ALLOWED_TYPES.includes(file.type);

    if (!hasAllowedExtension || !hasAllowedType) {
      return { fileType: true };
    }

    if (file.size > maxBytes) {
      return { fileSize: true };
    }

    return null;
  };
}
