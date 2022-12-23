import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewetapeComponent } from './newetape.component';

describe('NewetapeComponent', () => {
  let component: NewetapeComponent;
  let fixture: ComponentFixture<NewetapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewetapeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewetapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
