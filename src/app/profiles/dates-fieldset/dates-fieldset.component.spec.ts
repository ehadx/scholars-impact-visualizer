import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesFieldsetComponent } from './dates-fieldset.component';

describe('DatesFieldsetComponent', () => {
  let component: DatesFieldsetComponent;
  let fixture: ComponentFixture<DatesFieldsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatesFieldsetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatesFieldsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
