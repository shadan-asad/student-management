import morgan from 'morgan';
import { stream } from '../config/logger';

// Custom token for request body
morgan.token('body', (req: any) => JSON.stringify(req.body));

// Custom token for response body
morgan.token('response-body', (req: any, res: any) => {
  const originalSend = res.send;
  let responseBody: any;

  res.send = function (body: any) {
    responseBody = body;
    return originalSend.call(this, body);
  };

  return responseBody ? JSON.stringify(responseBody) : '';
});

// Create the request logger middleware
const requestLogger = morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms\nRequest Body: :body\nResponse Body: :response-body',
  { stream }
);

export default requestLogger; 