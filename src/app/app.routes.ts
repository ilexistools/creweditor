import { Routes } from '@angular/router';
import { PageHomeComponent } from './page-home/page-home.component';
import { ExamplesApisComponent } from './examples-apis/examples-apis.component';
import { ExamplesGptComponent } from './examples-gpt/examples-gpt.component';
import { PageEvaluateComponent } from './page-evaluate/page-evaluate.component';
import { PageStepsComponent } from './page-steps/page-steps.component';

export const routes: Routes = [
    //{ path: '', component: PageStepsComponent },
    { path: '', component: PageHomeComponent },
    {path: 'avaliar', component: PageEvaluateComponent},
    { path: 'examples-apis', component: ExamplesApisComponent },
    { path: 'examples-gpt', component: ExamplesGptComponent },
];
