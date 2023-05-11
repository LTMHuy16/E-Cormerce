const { object, string, number, date, boolean, array } = require('yup');

async function validateNdisFields(reqBody) {
  try {
    let ndisSchema = object({
      participant: number().required(),
      participant_surname: string().required(),
      date_of_birth: date().required(),
      declaration: boolean().required(),
      NDISAPI: string().required(),
      order_id: string().required(),
      items: array().required(),
    });

    await ndisSchema.validate(reqBody);

    return { status: true };
  } catch (error) {
    return { status: false, message: error.message };
  }
}

module.exports = { validateNdisFields };
