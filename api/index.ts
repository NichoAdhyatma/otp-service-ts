import serverless from "serverless-http";
import app from '../dist/app'

export default serverless(app);
