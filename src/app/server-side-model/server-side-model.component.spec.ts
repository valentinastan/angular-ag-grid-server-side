import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerSideModelComponent } from './server-side-model.component';

describe('ServerSideModelComponent', () => {
  let component: ServerSideModelComponent;
  let fixture: ComponentFixture<ServerSideModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerSideModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerSideModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
