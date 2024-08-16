import { z } from 'zod';

class ValidationError extends z.ZodError {}

export { ValidationError };
