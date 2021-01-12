/** 
 *
 * @swagger
 *  components:
 *    schemas:
 *      Users:
 *        type: object
 *        required:
 *          - companyName
 *          - email
 *          - password
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id for the company.
 *          companyName:
 *            type: string
 *            description: Company name.
 *          email:
 *            type: string
 *            description: Company email address.
 *          password:
 *            type: string
 *            description: Company password.
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *        example:
 *           companyName: Google
 *           email: mail@gmail.com
 *           password: password
 */