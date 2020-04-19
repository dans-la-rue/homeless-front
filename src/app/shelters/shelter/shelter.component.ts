import {Component, Input, OnInit} from '@angular/core';
import {Shelter} from '../../models/Shelter.models';

@Component({
  selector: 'shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.scss']
})
export class ShelterComponent implements OnInit {

  @Input() shelter: Shelter;

  constructor() {
  }

  ngOnInit(): void {
  }

}
