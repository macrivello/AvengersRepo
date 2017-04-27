import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const LAYOUT_ROUTES : Routes = [{
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule {}
