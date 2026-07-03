/**
 * Validates that all required environment variables are defined
 * Throws an error and stops the application if any are missing
 */

const validateEnv = () => {
    const requiredEnvVars = [
        'PORT',
        'MONGODB_URI',
        'JWT_SECRET',
        'JWT_EXPIRES_IN'
    ];

    const missingEnvVars = requiredEnvVars.filter(
        (envVar) => !process.env[envVar]
    );

    if (missingEnvVars.length > 0) {
            console.error('\nEnvironment validation failed.');
            console.error(
                'Missing required environment variable(s): ${missingEnvVars.join(',')}'
            );
        process.exit(1);
    }

    console.log('Environment variables validated successfully');

};

module.exports = validateEnv;
