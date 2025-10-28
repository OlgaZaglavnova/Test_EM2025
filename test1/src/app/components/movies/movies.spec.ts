import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Films } from './movies';

describe('Films', () => {
  let component: Films;
  let fixture: ComponentFixture<Films>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Films]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Films);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
