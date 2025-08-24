import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Import Angular Material styles
// import '@angular/material/prebuilt-themes/indigo-pink.css';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
