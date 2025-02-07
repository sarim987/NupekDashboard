import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../helpers';
import { ScriptLoaderService } from '../../_services/script-loader.service';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BillingComponent implements OnInit, AfterViewInit {

  constructor(private _script: ScriptLoaderService) {

  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this._script.loadScripts('app-billing',
      ['../../assets/asset/forms/wizards/wizard.js']);

  }

}
