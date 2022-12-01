import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewvilleComponent } from './newville.component';

describe('NewvilleComponent', () => {
  let component: NewvilleComponent;
  let fixture: ComponentFixture<NewvilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewvilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewvilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
