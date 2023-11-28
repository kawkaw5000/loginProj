// AppwriteService.ts
import { Crea } from 'appwrite';

const appwrite = create();

appwrite
  .setEndpoint('https://api.appwrite.io') // replace with your Appwrite endpoint
  .setProject('your-appwrite-project-id'); // replace with your Appwrite project ID

export default appwrite;
