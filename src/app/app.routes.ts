import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { MelonComponent } from './melon/melon.component';
import { PhaserComponent } from './phaser/phaser.component';

export const routes: Routes = [
    {path: '', component: AccueilComponent},
    {path: 'phaser', component: PhaserComponent},
    {path: 'phaser/:id', component: PhaserComponent},
    {path: 'melon', component:MelonComponent},
    {path: 'melon/:id', component:MelonComponent},
];
