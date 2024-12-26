export const logDebug = (message: any, prefix: string = '', severity: string = undefined) => {
  let logMessage = message; // Store the original message

  if (severity === undefined) {
    if (prefix != '') {
      console.debug(`${prefix}: `, message);
    } else {
      console.debug(prefix, message);
    }
    return;
  }

   // Check if it's an object (and not null)
  if (typeof message === 'object' && message !== null) {
    try {
        // Convert to JSON string with indentation
        logMessage = JSON.stringify(message, null, 2);
    } catch (error) {
        // Handle potential circular references
        logMessage = "Error stringifying object: " + error;
    }
  }

  if (prefix) logMessage = `${prefix}: ${logMessage}`;

  if (severity === 'info') {
    console.info(`INFO: ${logMessage}`);
  } else if (severity === 'error') {
    console.error(`ERROR: ${logMessage}`);
  } else if (severity === 'warn') {
    console.warn(`WARN: ${logMessage}`);
  } else {
    console.log(`DEBUG: ${logMessage}`);
  }
};