           GENERATION OF COMPONENTS


### 1. Generate Components

```bash
ng generate component dashboard
ng generate component visuals
```

### 2. Set Up Routing (`app-routing.module.ts`)

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VisualsComponent } from './visuals/visuals.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'visuals', component: VisualsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

