import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MelonComponent } from './melon.component';

describe('MelonComponent', () => {
  let component: MelonComponent;
  let fixture: ComponentFixture<MelonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MelonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MelonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
