import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerksSectionComponent } from './perks-section.component';

describe('PerksSectionComponent', () => {
  let component: PerksSectionComponent;
  let fixture: ComponentFixture<PerksSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerksSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerksSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
