#!/usr/bin/env node

require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const { program } = require('commander');
const { Configuration, DefaultApi } = require('coolify-api-client');

// Check for required environment variables
if (!process.env.COOLIFY_API_KEY) {
  console.error('Error: COOLIFY_API_KEY is not set in the environment');
  process.exit(1);
}

if (!process.env.COOLIFY_URL) {
  console.error('Error: COOLIFY_URL is not set in the environment');
  process.exit(1);
}

// Configure the API client
const apiConfig = new Configuration({
  basePath: process.env.COOLIFY_URL,
  apiKey: process.env.COOLIFY_API_KEY,
});
const api = new DefaultApi(apiConfig);

program
  .version('0.1.0')
  .description('Coolify CLI - Manage your Coolify resources');

program
  .command('list-projects')
  .description('List all projects')
  .action(async () => {
    try {
      const response = await api.listProjects();
      console.table(response.data);
    } catch (error) {
      console.error('Error listing projects:', error.message);
    }
  });

program
  .command('deploy <projectId>')
  .description('Deploy a project')
  .action(async (projectId) => {
    try {
      const response = await api.deployProject(projectId);
      console.log(`Deployment initiated for project ${projectId}`);
      console.log('Deployment ID:', response.data.deploymentId);
    } catch (error) {
      console.error('Error deploying project:', error.message);
    }
  });

// Add more commands here as needed

program.parse(process.argv);
