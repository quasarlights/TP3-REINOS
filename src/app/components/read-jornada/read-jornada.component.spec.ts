import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadJornadaComponent } from './read-jornada.component';

describe('ReadJornadaComponent', () => {
  let component: ReadJornadaComponent;
  let fixture: ComponentFixture<ReadJornadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadJornadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
