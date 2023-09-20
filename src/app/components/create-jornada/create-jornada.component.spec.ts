import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJornadaComponent } from './create-jornada.component';

describe('CreateJornadaComponent', () => {
  let component: CreateJornadaComponent;
  let fixture: ComponentFixture<CreateJornadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJornadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
