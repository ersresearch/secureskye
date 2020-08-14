import { Component, OnInit } from '@angular/core';
import { OtaService } from '../ota.service';
import { ota, BreadcrumbSwitchLink } from '../../shared/model';
import { BreadcrumbsSwitchService } from '../../shared/service';

@Component({
  selector: 'app-ota-list',
  templateUrl: './ota-list.component.html',
  styleUrls: ['./ota-list.component.scss']
})
export class OtaListComponent implements OnInit {

  /**
   * Archives list
   */
  archives: ota.vehicle.IMetadataProto[];

  /**
   * Current page number
   */
  pageNo = 1;
  /**
   * Number of items per page.
   */
  itemsPerPage = 7;

  constructor(
    private otaService: OtaService,
    private breadcrumbsSwitchService: BreadcrumbsSwitchService
  ) { }

  ngOnInit() {
    const self = this;

    self.breadcrumbsSwitchService.breadcrumbSwitchLinks(
      BreadcrumbSwitchLink.create('Upload', false, 'fa fa-cloud-upload', ['/ota/upload'])
    );
    /**
     * Get image archives data
     */
    self.otaService.getImageArchiveMetadataList().subscribe((resp) => {
      self.archives = resp.data;
      self.pageNo = 1;
    });
  }
}
