import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelJornadaComponent } from './panel-jornada.component';

describe('PanelJornadaComponent', () => {
  let component: PanelJornadaComponent;
  let fixture: ComponentFixture<PanelJornadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelJornadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
