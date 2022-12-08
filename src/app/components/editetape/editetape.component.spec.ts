import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditetapeComponent } from './editetape.component';

describe('EditetapeComponent', () => {
  let component: EditetapeComponent;
  let fixture: ComponentFixture<EditetapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditetapeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditetapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
