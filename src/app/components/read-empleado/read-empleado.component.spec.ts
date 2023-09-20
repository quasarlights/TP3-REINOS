import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadEmpleadoComponent } from './read-empleado.component';

describe('ReadEmpleadoComponent', () => {
  let component: ReadEmpleadoComponent;
  let fixture: ComponentFixture<ReadEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
