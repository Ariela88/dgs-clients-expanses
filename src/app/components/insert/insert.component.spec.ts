import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertComponent } from './insert.component';
import { ActivatedRoute } from '@angular/router';

describe('InsertComponent', () => {
  let component: InsertComponent;
  let fixture: ComponentFixture<InsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertComponent,ActivatedRoute]
    });
    fixture = TestBed.createComponent(InsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
