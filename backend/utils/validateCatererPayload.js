const { z } = require("zod");

const createCatererSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .trim()
    .min(1, "name is required and must be a non-empty string"),
  location: z
    .string({ required_error: "location is required" })
    .trim()
    .min(1, "location is required and must be a non-empty string"),
  pricePerPlate: z
    .number({ required_error: "pricePerPlate is required and must be a number" })
    .min(0, "pricePerPlate must be greater than or equal to 0"),
  cuisines: z
    .array(z.string().trim().min(1, "each cuisine must be a non-empty string"), {
      required_error: "cuisines must be a non-empty array",
    })
    .min(1, "cuisines must be a non-empty array"),
  rating: z
    .number({ required_error: "rating is required and must be a number" })
    .min(0, "rating must be between 0 and 5")
    .max(5, "rating must be between 0 and 5"),
});

function formatZodErrors(error) {
  const fieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.length > 0 ? issue.path[0] : "body";
    if (!fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}

function validateCatererPayload(payload) {
  const parsed = createCatererSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      valid: false,
      errors: formatZodErrors(parsed.error),
    };
  }

  return {
    valid: true,
    errors: {},
    data: parsed.data,
  };
}

module.exports = validateCatererPayload;
