import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarsTableComponent } from './scholars-table.component';

describe('ScholarsTableComponent', () => {
  let component: ScholarsTableComponent;
  let fixture: ComponentFixture<ScholarsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
